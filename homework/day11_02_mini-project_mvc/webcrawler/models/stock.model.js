import  mongoose  from "mongoose";

const starbucksSchema = new mongoose.Schema({
    name: String,
    img : String
})

// 주식이라는 컬렉션을 만든다. 
export const Starbucks = mongoose.model("Starbucks", starbucksSchema)