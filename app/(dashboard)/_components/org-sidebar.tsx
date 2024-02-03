'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Star } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

const font = Poppins({ subsets: ['latin'], weight: ['600'] })

export default function OrgSidebar() {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')
  return (
    <div className='hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
      <Link href='/'>
        <div className='flex items-center gap-x-2'>
          <Image
            src='/logo.svg'
            alt='Logo'
            width={60}
            height={60}
            className='cursor-pointer'
          />
          <span className={cn('font-semibold text-2xl', font.className)}>
            Board
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
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
      <div>
        <Button
          asChild
          variant={favorites ? 'ghost' : 'secondary'}
          size='lg'
          className='font-normal justify-start px-2 mb-1 min-w-36'
        >
          <Link href='/'>
            <LayoutDashboard className='h-4 w-4 mr-2' />
            Team boards
          </Link>
        </Button>
        <Button
          asChild
          variant={favorites ? 'secondary' : 'ghost'}
          size='lg'
          className='font-normal justify-start px-2 min-w-36'
        >
          <Link
            href={{
              pathname: '/',
              query: { favorites: 'true' },
            }}
          >
            <Star className='h-4 w-4 mr-2' />
            Favorite boards
          </Link>
        </Button>
      </div>
    </div>
  )
}
