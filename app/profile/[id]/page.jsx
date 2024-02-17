"use client"

import ProfileComponent from '@/components/Profile'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

function ProfileDetail() {
    const router = useRouter()
    const search = useSearchParams()
    const params = useParams()
    const id = params.id
    const name = search.get('name')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getDetailProfile = async () => {
            const response = await fetch(`/api/users/${id}?name=${name}`)
            const data = await response.json()

            setPosts(data)
        }
        
        getDetailProfile()
    }, [])

    return (
        <ProfileComponent
                name={name}
                desc={`Welcome to ${name}'s personalized profile page`}
                data={posts}
            />
    )
}

export default ProfileDetail
export const dynamic = 'force-dynamic'