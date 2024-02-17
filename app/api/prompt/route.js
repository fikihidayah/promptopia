import Prompt from "@/models/prompt"
import User from "@/models/user"
import { connectToDB } from "@/utils/databases"

export const GET = async (req) => {
    try {
        await connectToDB()
        const { searchParams } = req.nextUrl
        const query = searchParams.get('q') || ''

        const userFilter = await User.find({ username: { $regex: query, $options: 'i' } }, '_id')
        const userID = userFilter.map((user) => user._id)

        const filter = {
            $or: [
                { prompt: { $regex: query, $options: 'i' } },
                { tag: { $regex: query, $options: 'i' } },
                { creator: { $in: userID } }
                // { 'creator.username': { $regex: query, $options: 'i' } }, // masih belum bisa get username
            ],
        }


        const prompts = await Prompt.find(filter)
            .populate('creator')

        return new Response(JSON.stringify(prompts), {
            status: 200, headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch (error) {
        console.log(error.message)
        return new Response('Failed to fetch all prompts', {
            status: 500, headers: {
                'Content-Type': 'application/json',
            }
        })
    }
}