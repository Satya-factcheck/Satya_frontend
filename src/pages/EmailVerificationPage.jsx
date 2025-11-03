import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');

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
              <Link
                to="/login"
                className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-indigo-700 transition"
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
