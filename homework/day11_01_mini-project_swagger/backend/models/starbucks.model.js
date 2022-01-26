import mongoose from "mongoose";

const starbucksSchema = new mongoose.Schema({
  name: String,
  img: String,
});

// Token라는 컬렉션을 만든다.
export const Starbucks = mongoose.model("Starbucks", starbucksSchema);
