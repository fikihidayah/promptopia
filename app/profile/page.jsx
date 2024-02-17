"use client"

import {useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import ProfileComponent from '@/components/Profile'

function Profile() {

    const {data:session} = useSession()
    const [posts, setPosts] = useState([])
    const router = useRouter()

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/post`)
            const data = await response.json()
            setPosts(data)
        }
        
        if(session?.user.id) fetchPosts()
    }, [session])

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
        const isConfirmed = confirm('Are you sure you want to delete this prompt?')

        if(isConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id}`, {
                    method: 'DELETE',
                })

                const deletedPost = posts.filter((value) => value._id !== post._id)
                setPosts(deletedPost)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <ProfileComponent
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profile