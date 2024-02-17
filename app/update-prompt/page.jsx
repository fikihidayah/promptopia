'use client'

import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from '@/components/Form'
import { useEffect, useState } from "react"

function UpdatePrompt() {
    const {data: session} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams() // get params url
    const promptId = searchParams.get('id') // get id form params url

    const [submitting, setSubmitting] = useState()
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const updatePrompt = async (e) => {
        e.preventDefault()
        setSubmitting(true)

        const id = promptId
        if(!id) return alert('Prompt is not found!')
        
        try {
            // will be handled in dir api/prompt/new/route.js
            const res = await fetch(`/api/prompt/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag,
            })
        }

        if(promptId) getPromptDetails()
    }, [promptId])

  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
    />
  )
}

export default UpdatePrompt