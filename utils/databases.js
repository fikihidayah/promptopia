// WE CAN CREATE API in next js too as backend

import mongoose, { connect } from "mongoose";

let isConnected = false // track the connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true) // mongodb  strict query

    // check connection
    if (isConnected) {
        console.log('MongoDB is alredy connected')
        return
    }

    // connect mongodb
    try {
        await connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
        })
        isConnected = true
    } catch (error) {
        console.log(error)
    }
}

