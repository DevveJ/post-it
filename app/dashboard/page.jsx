import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'
import MyPosts from './MyPosts'

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <main>
      <h2 className='text-2xl font-semibold'>
        Welcome back <span className='font-bold text-teal-500'>{session?.user?.name}</span>
      </h2>
      <MyPosts />
    </main>
  )
}
