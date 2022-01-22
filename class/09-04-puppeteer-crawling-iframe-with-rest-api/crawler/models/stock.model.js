import  mongoose  from "mongoose";

const stockSchema = new mongoose.Schema({
    name: String,
    date: Date,
    price: Number
})

// 주식이라는 컬렉션을 만든다. 
export const Stock = mongoose.model("Stock", stockSchema)