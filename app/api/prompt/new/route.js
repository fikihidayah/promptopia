import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/databases"

// name of variable is same with request method name
export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json()

    try {
        await connectToDB()
        const newPrompt = new Prompt({
            creator: userId,
            tag,
            prompt,
        })

        await newPrompt.save()

        // use vanilla javascript web api Response class
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        console.log(error)
        return new Response('Failed to create prompts!', { status: 500 })
    }
}