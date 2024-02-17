import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/databases"

export const GET = async (req, { params }) => {
    try {
        await connectToDB()

        const id = params.id
        const { searchParams } = req.nextUrl
        const name = searchParams.get('name') || ''
        const post = await Prompt.find({
            $or: [
                { creator: id },
                { 'creator.username': name }
            ]
        }).populate('creator')

        return new Response(JSON.stringify(post), {
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