import { UserButton as ClerkUserButton } from '@clerk/clerk-react'
import { Settings } from 'lucide-react'

/**
 * UserButton - Displays the user profile button from Clerk
 * Shows avatar, dropdown menu with profile, account settings, etc.
 */
const UserButton = () => {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          avatarBox: 'w-10 h-10',
          userButtonPopoverCard: 'shadow-lg',
        },
      }}
    >
      <ClerkUserButton.MenuItems>
        <ClerkUserButton.Link
          label="Manage Interests"
          labelIcon={<Settings size={16} />}
          href="/settings"
        />
      </ClerkUserButton.MenuItems>
    </ClerkUserButton>
  )
}

export default UserButton

