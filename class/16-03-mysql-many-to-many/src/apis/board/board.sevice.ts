import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    //데이터 조회하는 로직
    return [
      // {
      //   number: 1,
      //   writer: 'w1',
      //   title: 'title',
      //   contents: 'sodif',
      // },
      // {
      //   number: 2,
      //   writer: 'w1',
      //   title: 'title',
      //   contents: 'sodif',
      // },
      // {
      //   number: 3,
      //   writer: 'w1',
      //   title: 'title',
      //   contents: 'sodif',
      // }
    ];
  }

  create(args): string {
    console.log(args);
    return '등록에 성공하였습니다.';
  }
}
