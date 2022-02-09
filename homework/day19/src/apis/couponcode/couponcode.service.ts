import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCouponCodeInput } from './dto/createCouponCode.input';
import { UpdateCouponCodeInput } from './dto/updateCouponCodeinput';
import { CouponCode } from './entities/couponcode.entity';

interface IFindOne {
  id: string;
}
interface ICreate {
  createCouponCodeInput: CreateCouponCodeInput;
}
interface IUpdate {
  id: string;
  updateCouponCodeInput: UpdateCouponCodeInput;
}

@Injectable()
export class CouponCodeService {
  constructor(
    @InjectRepository(CouponCode)
    private readonly couponCodeRepository: Repository<CouponCode>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.couponCodeRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.couponCodeRepository.findOne({
      where: { id: id },
    });
    return resultOfProduct;
  }

  async create({ createCouponCodeInput }: ICreate) {
    const result = await this.couponCodeRepository.save({
      ...createCouponCodeInput,
    });
    return result;
  }

  async update({ id, updateCouponCodeInput }: IUpdate) {
    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.couponCodeRepository.update({ id: id }, { ...updateCouponCodeInput });
  }

  async delete({ id }) {
    const result2 = await this.couponCodeRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result2.affected ? true : false;
  }
}
