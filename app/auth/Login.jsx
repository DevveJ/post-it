'use client'

import { signIn } from 'next-auth/react'

export default function Login () {
  return (
    <button
      className='py-2 px-4 bg-teal-600 text-white hover:bg-teal-500 active:bg-teal-700 rounded-md transition'
      onClick={() => signIn()}
    >
      Sign In
    </button>
  )
}
