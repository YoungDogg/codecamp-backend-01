import { Injectable } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';

@Injectable()
export class StarbucksService {
  fetchStarbucks(): Starbucks[] {
    // 커피 목록 조회한다.
    return [
      {
        number: 1,
        name: '아메리카노',
        price: '50000원',
        kcalPerOnce: '20kcal',
        fat: '10g',
        protein: '2g',
        salt: '200mg',
        sugar: '50g',
        caffeine: '500mg',
      },
      {
        number: 2,
        name: '아메리카노',
        price: '50000원',
        kcalPerOnce: '20kcal',
        fat: '10g',
        protein: '2g',
        salt: '200mg',
        sugar: '50g',
        caffeine: '500mg',
      },
      {
        number: 3,
        name: '아메리카노',
        price: '50000원',
        kcalPerOnce: '20kcal',
        fat: '10g',
        protein: '2g',
        salt: '200mg',
        sugar: '50g',
        caffeine: '500mg',
      },
      {
        number: 4,
        name: '아메리카노',
        price: '50000원',
        kcalPerOnce: '20kcal',
        fat: '10g',
        protein: '2g',
        salt: '200mg',
        sugar: '50g',
        caffeine: '500mg',
      },
      {
        number: 5,
        name: '아메리카노',
        price: '50000원',
        kcalPerOnce: '20kcal',
        fat: '10g',
        protein: '2g',
        salt: '200mg',
        sugar: '50g',
        caffeine: '500mg',
      },
    ];
  }
  create(args): string {
    console.log(args);
    return '스타벅스에 등록에 성공했습니다.';
  }
}
