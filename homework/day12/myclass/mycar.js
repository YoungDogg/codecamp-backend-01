export class Car {
    constructor(kind, hp, color){
        this.kind = kind;
        this.hp = hp;
        this.color = color;
    }
    kind;
    hp; 
    color;

    start = () => {
        return "car start"
    }
    stop = () => {
        return  "car stop";
    } 
}