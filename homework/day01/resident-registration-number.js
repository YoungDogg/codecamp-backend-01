// 주민번호 뒷 자리를 가리는 함수를 하나 만들고,
// 해당 함수에 “920324-1038293” 와 같이 주민번호를 넣어서 실행하면
//  “920324-1******” 와 같은 형태로 콘솔에 출력되도록 만들어 주세요.

// 1. 주민번호는 앞 6자리, 뒤 7자리로 구성되어야 합니다.
//     - 그렇지 않을 경우 에러를 출력해주세요. (”에러발생!!! 갯수를 제대로 입력해주세요!!!”)
// 2. 주민번호 가운데가 ”-” 로 구성되어야 합니다.
//     - 그렇지 않을 경우 에러를 출력해주세요. (”에러발생!!! 형식이 올바르지 않습니다!!!”)
// 3. 뒤 7자리 중, 끝 6자리는 *로 변경해서 출력해 주세요.
// 4. 함수는 퍼사드패턴이 적용되어야 합니다.
//     - 필요시 새로운 파일도 생성 가능합니다. - 파일명 자유
// 5. 함수에 “920324-1038293”를 넣어 실행했을 때, 콘솔에 출력된 **화면**과 **코드**를 작성한 파일을 클래스룸에 제출해주세요.

import { makeMarkRestNums } from "./latterNum.js";

const koreanSocialSecurityNumber = (num) => {
  if (!num.includes("-")) {
    console.log("에러발생!!! 형식이 올바르지 않습니다!!!");
    return;
  } else {
    let arr = num.split("-"); // 앞 뒤 - 기준으로 나누고
    let beforeNumLength = arr[0].split("").length;
    let latterNumLength = arr[1].split("").length;
    if (beforeNumLength != 6 || latterNumLength != 7) {
      console.log("에러발생!!! 갯수를 제대로 입력해주세요!!!");
      return;
    } else {
      makeMarkRestNums(arr);
      return;
    }
  }
};

koreanSocialSecurityNumber("920324-1038293");
