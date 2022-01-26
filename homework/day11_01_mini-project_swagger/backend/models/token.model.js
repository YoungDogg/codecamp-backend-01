import  mongoose  from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: String,
    phone: String,
    isAuth: Boolean
})

// Token라는 컬렉션을 만든다. 
export const Token = mongoose.model("Token", tokenSchema)