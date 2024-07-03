import mongoose from 'mongoose'

const discussionSchema=new mongoose.Schema({
    questionId:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    discussion:{
        type:String,
        required:true
    }
})

const Discussion=mongoose.models.Discussion || mongoose.model('Discussion',discussionSchema)

export default Discussion;