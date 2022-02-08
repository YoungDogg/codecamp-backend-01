import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.productRepository.find();
    return resultOfAllProducts;
  }
  async findOne({ productId }: IFindOne) {
    const resultOfProduct = await this.productRepository.findOne({
      id: productId,
    });
    return resultOfProduct;
  }

  async create({ createProductInput }: ICreate) {
    const result = await this.productRepository.save({
      ...createProductInput, // 스프레드 연산자
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
    });
    return result;
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
}
