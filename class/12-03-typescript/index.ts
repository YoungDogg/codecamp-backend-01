// 문자타입
// let aaa : string = "안녕하세요";
// aaa = 3;

let a : number = 123;
a = 23;

let c : boolean = false;
c = true;

let arr : number[] = [12,3,4,5];
let arr2 : (number | string)[] = [12,3,4,5, "근본없는", "js"];

let arr3 : number[] | string[] = [1000, 2000];
arr3 = ["ㅁ", "ㅈㄷㄹ","ㅐㅈ댜러"];

interface IMyObject{
    name : string,
    age : number | string,
    school : string
}

let myObject : IMyObject = {
    name : "temp name",
    age : 13,
    school : "temp school"
}
 
myObject.age = "14살";

const plusBoth = (a : number,b : number) : number => {
    return a + b;
}

// plusBoth("difb","1232") // 안된다.
plusBoth(1,2)