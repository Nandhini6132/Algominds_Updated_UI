

import mongoose from 'mongoose';


const connectToDb=async()=>{
    try {
        await mongoose.connect('mongodb+srv://Nandhini:Elakkiya@cluster0.7ucexvj.mongodb.net/leetcoderetryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log('connected to db')
    } catch (error) {
        console.log(error)
        
    }
}

export default connectToDb;