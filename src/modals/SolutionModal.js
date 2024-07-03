import mongoose from 'mongoose'


const solutionSchema= new mongoose.Schema({
    userName:{
        type:String,
        // required:true
    },
    userId:{
        type:String,
        // required:true
    },
    questionId:{
        type:String,
        // required:true
    },
    solution:{
        type:Object,
        required:true
    }
})

const Solution=mongoose.models.PostSolution || mongoose.model('PostSolution', solutionSchema)

export default Solution;