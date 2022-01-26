import { Starbucks } from "../models/starbucks.model.js";

export class StarbucksController {
  getStarbucks = async  (req, res) => {
    const result = await Starbucks.find();
    res.send(result);
    return;
  };
}
