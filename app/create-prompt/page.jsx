'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Form from '@/components/Form'
import { useState } from "react"

function CreatePrompt() {
    const {data: session} = useSession()
    const router = useRouter()

    const [submitting, setSubmitting] = useState()
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        
        try {
            // will be handled in dir api/prompt/new/route.js
            const res = await fetch('/api/prompt/new', {
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(res.ok) {
                router.push('/')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt