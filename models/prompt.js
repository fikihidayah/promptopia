import { Schema, model, models, ObjectId } from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: ObjectId, // object id is user id
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required']
    },
})


// create models if doesnt exists
const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt