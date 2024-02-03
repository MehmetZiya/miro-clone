'use client'

import {
  OrganizationSwitcher,
  UserButton,
  useOrganization,
} from '@clerk/nextjs'

import SearchInput from './search-input'
import { InviteButton } from './invite-button'

export default function Navbar() {
  const { organization } = useOrganization()
  return (
    <div className='flex items-center gap-x p-5 '>
      <div className='hidden lg:flex lg:flex-1'>
        <SearchInput />
      </div>

      <div className='block lg:hidden flex-1'>
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                maxWidth: '376px',
              },
              organizationSwitcherTrigger: {
                backgroundColor: 'transparent',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '100%',
                padding: '6px',
                justifyContent: 'space-between',
              },
            },
          }}
        />
      </div>
      {organization && <InviteButton />}
      <UserButton />
    </div>
  )
}
