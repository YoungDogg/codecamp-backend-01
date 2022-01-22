import  mongoose  from "mongoose";

const boardSchema = new mongoose.Schema({
    writer: String,
    title: String,
    contents: String
})

// 보드라는 컬렉션을 만든다. 
export const Board = mongoose.model("Board", boardSchema)