import mongoose from "mongoose";
const URI="mongodb+srv://emadg07ed:<password>@cluster0.eywguyk.mongodb.net/"
 

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB