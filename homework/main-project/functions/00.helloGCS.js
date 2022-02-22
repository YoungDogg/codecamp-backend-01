import { Storage } from "@google-cloud/storage";
import { Sharp } from "sharp";

exports.helloGCS = (event, context) => {
  console.log("hello world!!!");
  console.log("====================");
  console.log("context: ", context);
  console.log("evnt: ", event);
  console.log("====================");
};
