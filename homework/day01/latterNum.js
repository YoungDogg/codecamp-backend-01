export function makeMarkRestNums(arr){
    let latterNum = arr[1];     // 뒷부분 저장하고
        latterNum = latterNum.split("");    // 숫자 하나씩 쪼개고
        // for(let i = 1; i < latterNum.length; i++){ // 첫째자리 빼고 다 *로 바꾸기
        //     latterNum[i] = "*";
        // }
        latterNum.fill("*", 1);
        latterNum = latterNum.join(''); // 뒷자리들 합치기
        // arr = arr[0].concat(latterNum);
        arr[1] = "-"; // - 붙여주기
        arr = arr.concat(latterNum); // 앞뒤자리 붙이기
        arr = arr.join(''); // 문자열로 만들기
        console.log(arr);
}