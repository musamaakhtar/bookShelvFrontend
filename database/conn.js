import mongoose from 'mongoose';

const connectMongo = async () => {
    const URL = "mongodb+srv://ACU:1234@cluster0.zi8y9jz.mongodb.net/?retryWrites=true&w=majority"
    try {

        const {connection} = await mongoose.connect(URL)
        if (connection.readyState == 1) {
            console.log(`Database Connected ${URL}`)
        }

    } catch (errors) {
        return Promise.reject(errors)
    }
}

export default connectMongo;