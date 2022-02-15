import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    // 데이터 조회하는 로직

    // const arr = [
    //   // {
    //   //   number: 1,
    //   //   writer: null,
    //   //   title: '제목입니다~',
    //   //   contents: '내용이에요~~',
    //   // },
    // ];
    return;
  }
}
// create(args): string {
//   // 데이터 등록하는 로직

//   console.log(args);

//   return '등록에 성공하였습니다.';
// }
