'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
import { useRouter } from 'next/navigation'

const PromptCardList = ({data, handleTagClick, handleUserClick}) => {

  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleUserClick={handleUserClick}
        />
      ))}
    </div>
  )
}

function Feed() {

  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const router = useRouter()

  useEffect( () => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json()

      setPosts(data)
    }
    
    fetchPosts()
  }, [])

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value)
    const response = await fetch(`/api/prompt?q=${encodeURIComponent(e.target.value)}`)
    const data = await response.json()

    if(data) setPosts(data)
  }

  const handleTagClick = async (tag) => {
    setSearchText(tag)
    const response = await fetch(`/api/prompt?q=${encodeURIComponent(tag)}`)
    const data = await response.json()

    if(data) setPosts(data)
  }

  const handleUserClick = async (user) => {
    router.push('/profile/' + user._id + '?name=' + user.username)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input 
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer' 
        />
      </form>

      <PromptCardList 
        data={posts}
        handleTagClick={handleTagClick}
        handleUserClick={handleUserClick}/>

    </section>
  )
}

export default Feed