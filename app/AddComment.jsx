'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export default function AddComment ({ id }) {
  let commentToastId
  console.log(id)
  const [title, setTitle] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async (data) => {
      return axios.post('/api/posts/addComment', { data })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post'])
        setTitle('')
        setIsDisabled(false)
        toast.success('Added your comment', { id: commentToastId })
      },
      onError: (error) => {
        console.log(error)
        setIsDisabled(false)
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId })
        }
      }
    }
  )

  const submitPost = async (e) => {
    e.preventDefault()
    setIsDisabled(true)
    commentToastId = toast.loading('Adding your comment', {
      id: commentToastId
    })
    mutate({ title, postId: id })
  }
  return (
    <form onSubmit={submitPost} className='my-8'>
      <h3 className='text-xl'>Add a comment</h3>

      <div className='flex flex-col my-2'>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type='text'
          name='title'
          className='p-4 text-lg rounded-md my-2 dark:bg-zinc-800'
        />
      </div>
      <div className='flex items-center gap-2'>
        <button
          disabled={isDisabled}
          className=' text-sm bg-teal-600 text-white py-2 px-4 rounded-md disabled:opacity-25'
          type='submit'
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            title.length > 100 ? 'text-red-700' : 'text-zinc-500'
          } `}
        >{`${title.length}/100`}
        </p>
      </div>
    </form>
  )
}
