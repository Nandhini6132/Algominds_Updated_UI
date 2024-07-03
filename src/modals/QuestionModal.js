import mongoose from "mongoose";


const postQuestionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        // difficulty: {
        //     type: String,
        //     required: true
        // },
        questionId: {
            type: Number,
            required: true
        },
        input: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },

        output: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        },
        target: {
            type: mongoose.Schema.Types.Mixed,
        },
        description: {
            type: String
        },
        input2: {
            type: mongoose.Schema.Types.Mixed,
        },
        output2: {
            type: mongoose.Schema.Types.Mixed,
        },
        input3: {
            type: mongoose.Schema.Types.Mixed,
        },
        output3: {
            type: mongoose.Schema.Types.Mixed,
        },
        explanation: {
            type: String
        },
        isPremium: {
            type: Boolean,
            default: false
        }


    }
)

const PostQuestion = mongoose.models.PostQuestion || mongoose.model('PostQuestion', postQuestionSchema)


export default PostQuestion;