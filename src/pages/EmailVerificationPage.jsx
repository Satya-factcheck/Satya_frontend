import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Loader, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [resendingVerification, setResendingVerification] = useState(false);
  const [verificationResent, setVerificationResent] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    const verify = async () => {
      const result = await verifyEmail(token);
      
      if (result.success) {
        setStatus('success');
        setMessage(result.message || 'Email verified successfully!');
        
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/', { state: { message: 'Email verified! You can now access all features.' } });
        }, 3000);
      } else {
        setStatus('error');
        setMessage(result.error || 'Verification failed');
      }
    };

    verify();
  }, [searchParams, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    if (!userEmail) {
      setMessage('Please enter your email address');
      return;
    }

    setResendingVerification(true);
    setVerificationResent(false);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/resend-verification-by-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setVerificationResent(true);
      } else {
        throw new Error(data.error || 'Failed to resend verification email');
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setResendingVerification(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          {status === 'verifying' && (
            <>
              <Loader className="w-16 h-16 text-indigo-600 mx-auto mb-4 animate-spin" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verifying Email</h1>
              <p className="text-gray-600 dark:text-gray-400">Please wait while we verify your email address...</p>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Email Verified!</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Redirecting you to home page...</p>
            </>
          )}

          {status === 'error' && (
            <>
              <XCircle className="w-16 h-16 text-red-600 dark:text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verification Failed</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
              
              {verificationResent ? (
                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-sm text-green-800 dark:text-green-300">
                    Verification email sent! Please check your inbox and spam folder.
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Need a new verification link? Enter your email:
                  </p>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition mb-3"
                  />
                  <button
                    onClick={handleResendVerification}
                    disabled={resendingVerification || !userEmail}
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                  >
                    <RefreshCw className={`w-4 h-4 ${resendingVerification ? 'animate-spin' : ''}`} />
                    {resendingVerification ? 'Sending...' : 'Resend Verification Email'}
                  </button>
                </div>
              )}
              
              <Link
                to="/login"
                className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Go to Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
