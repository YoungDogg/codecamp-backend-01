class Air {
    height = 100;
    constructor(AirHeight){
        this.height = AirHeight;
    }
    run = () => {
        console.log("날아서 도망");
    }
}

class Ground { 
    run = () => {
        console.log("뛰어서 도망");
    }
}

class Monster extends Air {
    power = 10;
     
    constructor(power, MonsterHeight){
        super(MonsterHeight);
        this.power = power;
    }

    attack = () => {
        console.log("공격하자"); 
        console.log("내 공격력 : " + this.power); 
    }
}
 

const myMonster = new Monster(100);
myMonster.attack();
myMonster.run();

const myAir = new Air(3333);
console.log(myAir);