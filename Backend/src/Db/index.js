import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("connected to db host", connectionInstance.connection.host)
    } catch (error) {
        console.log("database connection error ")
        process.exit(1)
    }

}

