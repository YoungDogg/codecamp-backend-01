import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from '../productSalesLocation/entities/productSalesLocation.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';

interface ICreate {
  createProductInput: CreateProductInput;
}

interface IFindOne {
  productId: string;
}
interface IUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSalesLocation)
    private readonly productSalesLocationRespository: Repository<ProductSalesLocation>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.productRepository.find({
      relations: ['productSalesLocation'],
    });
    return resultOfAllProducts;
  }
  async findOne({ productId }: IFindOne) {
    const resultOfProduct = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation'], // salesLocation이랑 같이 조회할 거이다.
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createProductInput }: ICreate) {
    // 1. 상품만 등록하는 경우
    // const result = await this.productRepository.save({
    //   ...createProductInput, // 스프레드 연산자
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    // });
    // return result;

    // 2. 상품과 주소테이블을 연결하여 등록하기 JOIN
    // 하나하나 분해하기
    // const product = {
    //   name: createProductInput.name,
    //   decription: createProductInput.description,
    //   price: createProductInput.price,
    // };
    // rest parameter
    const { productSalesLocation, ...product } = createProductInput;
    const prdSales = await this.productSalesLocationRespository.save({
      ...productSalesLocation,
    });
    const return2Front = await this.productRepository.save({
      ...product,
      productSalesLocation: prdSales, // id를 얻기 위해 하는 것이다. sales의 ID, FK
    });
    return return2Front;
  }
  async update({ productId, updateProductInput }: IUpdate) {
    try {
      const product = await this.productRepository.findOne({ id: productId });
      const newProduct = {
        ...product,
        ...updateProductInput,

        // name: updateProductInput.name,
        // description: updateProductInput.description,
        // price: updateProductInput.price,
      };

      const result = await this.productRepository.save(newProduct);
      return result + '수정이 완료되었습니다';

      // this.productRepository.update({ id: productId }, { ...updateProductInput });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (product.isSoldout)
      // throw new HttpException('이미 판매 완료된 상품입니다.', 422);
      // throw new HttpException(
      //   '이미 판매 완료된 상품입니다.',
      //   HttpStatus.UNPROCESSABLE_ENTITY,
      // );
      throw new UnprocessableEntityException();
  }

  async delete({ productId }) {
    // 1. 진짜 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;
    // 2. 소프트삭제 -1
    // await this.productRepository.update({ id: productId }, { isDeleted: true });
    // 3. 소프트삭제 -2
    // await this.productRepository.update(  { id: productId }, { deletedAt: new Date() }, );
    // 4.
    // await this.productRepository.softRemove({ id : productId}) // 아이디로만 삭제 가능

    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
