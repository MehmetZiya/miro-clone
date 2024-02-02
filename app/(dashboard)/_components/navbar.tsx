'use client'

import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  return (
    <div className='flex items-center gap-x p-5 bg-green-500'>
      <div className='hidden lg:flex lg:flex-1'></div>
      <UserButton />
    </div>
  )
}
