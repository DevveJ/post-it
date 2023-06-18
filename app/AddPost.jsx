'use client'

import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios, { AxiosError } from 'axios'

export default async function CreatePost () {
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const queryClient = useQueryClient()
  let toastPostID

  // Create a post
  const { mutate } = useMutation(
    async (title) =>
      await axios.post('/api/posts/addPost', {
        title
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPostID })
        }
        setIsDisabled(false)
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts'])
        toast.success('Post has been made 🔥', { id: toastPostID })
        setTitle('')
        setIsDisabled(false)
      }
    }
  )
  const submitPost = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    toastPostID = toast.loading('Creating your post', { id: toastPostID })
    mutate(title)
  }

  return (
    <form onSubmit={submitPost} className='bg-white dark:bg-zinc-800 my-8 p-8 rounded-md '>
      <div className='flex flex-col my-4'>
        <textarea
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name='title'
          placeholder="What&apos;s on your mind?"
          className='p-4 text-lg rounded-md my-2 bg-gray-200 dark:bg-zinc-900'
        />
      </div>
      <div className=' flex items-center justify-between gap-2'>
        <p
          className={`font-bold text-sm ${
            title.length > 100 ? 'text-red-700' : 'text-zinc-500'
          } `}
        >{`${title.length}/100`}
        </p>
        <button
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-2 px-4 rounded-md disabled:opacity-25'
          type='submit'
        >
          Create post
        </button>
      </div>
    </form>
  )
}
