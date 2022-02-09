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
  id: string;
}
interface ICreate {
  createBrandInput: CreateBrandInput;
}
interface IUpdate {
  id: string;
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
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.brandRepository.findOne({
      where: { id: id },
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

  async update({ id, updateBrandInput }: IUpdate) {
    // const brand = await this.brandRepository.findOne({ id: id });
    // const newBrand = {
    //   ...brand,
    //   ...updateBrandInput,
    //   // name: updateProductInput.name,
    //   // description: updateProductInput.description,
    //   // price: updateProductInput.price,
    // };
    // const result = await this.brandRepository.save(newBrand);
    // return result + '수정이 완료되었습니다';

    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.brandRepository.update({ id: id }, { ...updateBrandInput });
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

  async delete({ id }) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    // 2. 소프트삭제 -1
    // await this.productRepository.update({ id: productId }, { isDeleted: true });
    // 3. 소프트삭제 -2
    // await this.productRepository.update(  { id: productId }, { deletedAt: new Date() }, );
    // 4.
    // await this.productRepository.softRemove({ id : productId}) // 아이디로만 삭제 가능

    const result2 = await this.brandRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result2.affected ? true : false;
  }
}
