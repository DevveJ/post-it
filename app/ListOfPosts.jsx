'use client'

import axios from 'axios'
import Post from './Post'
import { useQuery } from 'react-query'

const allPosts = async () => {
  const response = await axios.get('/api/posts/getPosts')
  return response.data
}

export default function ListOfPosts () {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ['posts']
  })
  if (error) return error
  if (isLoading) return 'Loading.....'

  return (
    <>
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          comments={post.comments}
        />

      ))}
    </>
  )
}
