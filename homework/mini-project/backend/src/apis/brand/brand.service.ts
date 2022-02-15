import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBrandInput } from './dto/createBrand.input';
import { UpdateBrandInput } from './dto/updateBrand.input';
import { Brand } from './entities/brand.entity';

interface IFindOne {
  brandId: string;
}
interface ICreate {
  createBrandInput: CreateBrandInput;
}
interface IUpdate {
  brandId: string;
  updateBrandInput: UpdateBrandInput;
}

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.brandRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ brandId }: IFindOne) {
    const resultOfProduct = await this.brandRepository.findOne({
      brandId: brandId,
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createBrandInput }: ICreate) {
    const result = await this.brandRepository.save({
      ...createBrandInput,
    });
    return result;
  }

  async update({ brandId, updateBrandInput }: IUpdate) {
    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.brandRepository.update({ brandId: brandId }, { ...updateBrandInput });
  }

  // async checkSoldout({ id }) {
  //   const product = await this.brandRepository.findOne({ id: id });
  //   if (product.isSoldout)
  //     // throw new HttpException('이미 판매 완료된 상품입니다.', 422);
  //     // throw new HttpException(
  //     //   '이미 판매 완료된 상품입니다.',
  //     //   HttpStatus.UNPROCESSABLE_ENTITY,
  //     // );
  //     throw new UnprocessableEntityException();
  // }

  async delete({ brandId }) {
    const result = await this.brandRepository.softDelete({ brandId: brandId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
