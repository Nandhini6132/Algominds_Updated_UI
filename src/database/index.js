

import mongoose from 'mongoose';


const connectToDb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://Nandhini:Elakkiya@cluster0.7ucexvj.mongodb.net/leetcode',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          })
        console.log('connected to db')
    } catch (error) {
        console.log(error)
        
    }
}

export default connectToDb;