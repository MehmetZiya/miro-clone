'use client'

import qs from 'query-string'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebounceValue } from 'usehooks-ts'
import { Input } from '@/components/ui/input'
import { ChangeEvent, useEffect, useState } from 'react'

export default function SearchInput() {
  const router = useRouter()
  const [debouncedValue, setValue] = useDebounceValue('', 1100)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: '/',
        query: {
          search: debouncedValue,
        },
      },
      { skipEmptyString: true, skipNull: true }
    )

    router.push(url)
  }, [debouncedValue, router])
  return (
    <div className='w-full relative'>
      <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
      <Input
        type='search'
        placeholder='Search boards'
        className='w-full max-w-[516px] pl-9'
        onChange={handleChange}
        id='search-input'
      />
    </div>
  )
}
