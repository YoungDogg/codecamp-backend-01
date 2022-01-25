const aaa = new Date(); 

console.log(aaa.getFullYear());

class Monster {
    power = 10;

    constructor(power){
        this.power = power
    }

    attack = () => {
        console.log("공격하자"); 
        console.log("내 공격력 : " + this.power); 
    }

    run = () => {
        console.log("도망가자");
    }
}

const myMonster = new Monster(50);
myMonster.attack();
myMonster.run();
console.log("=============================")
const myMonster2 = new Monster(5000000);
myMonster2.attack();
myMonster2.run();