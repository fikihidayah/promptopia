import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/databases"

// GET(Read)
export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), {
            status: 200, headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        return new Response('Failed to fetch all prompts', {
            status: 500, headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

// PATCH(Edit)
export const PATCH = async (req, { params }) => {
    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)
        // check prompt exists
        if (!existingPrompt) return new Response('Prompt not found', { status: 404 })

        const { prompt, tag } = await req.json()

        // update prompt
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to update prompt', {
            status: 500, headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}

// DELETE(remove)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB()

        await Prompt.deleteOne({ _id: params.id })
        return new Response('Prompt was deleted succesfully', {
            status: 200, headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.log(error.message)
        return new Response('Failed to delete prompts', {
            status: 500, headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}