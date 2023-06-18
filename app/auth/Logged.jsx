'use client'

import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Logged ({ image }) {
  return (
    <li className='flex gap-8 items-center'>
      <button
        className='text-teal-500 border-2 border-solid border-teal-600 hover:border-teal-500 active:border-teal-700 text-sm px-4 py-2 rounded-md transition'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <Link href='/dashboard'>
        <Image
          width={64}
          height={64}
          className='w-14 rounded-full'
          src={image}
          alt=''
          priority
        />
      </Link>
    </li>
  )
}
