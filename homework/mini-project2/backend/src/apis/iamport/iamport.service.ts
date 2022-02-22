import {
  ConflictException,
  HttpException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
  async getToken() {
    try {
      const result = await axios.post('https://api.iamport.kr/users/getToken', {
        imp_key: process.env.IAMPORT_API_KEY,
        imp_secret: process.env.IAMPORT_SECRET,
        // imp_secret: '111',
      });
      //   console.log(`===============result=============`);
      //   console.log(result.data.response.access_token);
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException( // 이걸로 GraphQL에서 나타난다
        error.response.data.message,
        error.response.status,
      );
      console.log(error.response.data.message);
    }
  }

  async checkPaid({ impUid, amount, token }) {
    console.log(`===========impUid=============`);
    console.log(impUid);
    console.log(`===========token=============`);
    console.log(token);

    try {
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        { headers: { Authorization: token } }, //
      );
      if (result.data.response.status !== 'paid')
        throw new ConflictException('결제 내역이 존재하지 않습니다.');
      if (result.data.response.amount !== amount)
        throw new UnprocessableEntityException('결제 금액이 잘못되었습니다');

      console.log(result);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.log(error);
        throw new HttpException(
          error.response.data.message,
          error.response.status,
        );
      } else {
        throw error;
      }
    }
  }

  async cancel({ impUid, token }) {
    try {
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        {
          imp_uid: impUid,
        },
        { headers: { Authorization: token } },
      );
      console.log(`result=============`);
      console.log(result);
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.status,
      );
    }
  }
}
