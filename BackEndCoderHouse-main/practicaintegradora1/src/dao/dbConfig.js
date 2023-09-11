import mongoose from "mongoose"

const URI="mongodb+srv://emadg07ed:<password>@cluster0.eywguyk.mongodb.net/"

await mongoose.connect(URI,{
    serverSelectionTimeoutMS:5000,
})
console.log("Base de datos conectada....")


