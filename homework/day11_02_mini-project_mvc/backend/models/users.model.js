import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: String,
  email: String,
  personal: String,
  phone: String,
  favoriteSite: String,
  password: String,
  og :  {
    title : String,
    description : String,
    image : String
  }
});

// Token라는 컬렉션을 만든다.
export const Users = mongoose.model("Users", usersSchema);
