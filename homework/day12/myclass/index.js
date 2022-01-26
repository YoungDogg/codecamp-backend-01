import { Car } from "./mycar.js";


const car1 = new Car("Sedan", 4000, "Ivory");
car1.color
console.log(`
car1.kind : ${car1.kind}
car1.hp : ${car1.hp}
car1.color : ${car1.color}
car1.start() : ${car1.start()}
car1.stop() : ${car1.stop()}
`)
