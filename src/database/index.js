

import mongoose from 'mongoose';


const connectToDb=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.once("connected", () => {
          console.log("MongoDB database connection established successfully");
        });
        connection.once("error", (error) => console.log(error,'err from db'));
        console.log('connected to db')
    } catch (error) {
        console.log(error)
        
    }
}

export default connectToDb;