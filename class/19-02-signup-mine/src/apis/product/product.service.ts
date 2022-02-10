import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
import { ProductSalesLocation } from '../productSalesLocation/entities/productSalesLocation.entity';
import { ProductTag } from '../productTag/entities/productTag.entity';
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
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.productRepository.find({
      relations: ['productSalesLocation', 'productCategory', 'productTags'],
    });
    return resultOfAllProducts;
  }
  async findOne({ productId }: IFindOne) {
    const resultOfProduct = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory', 'productTags'], // salesLocation이랑 같이 조회할 거이다.
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createProductInput }: ICreate) {
    const { productTags, productSalesLocation, productCategoryId, ...product } =
      createProductInput;

    //=================new things=========================
    const result3 = [];
    // 추후 for문을 map, Promise.all 최적화
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', ''); // #가전제품 -> # 없애려고

      const prevTag = await this.productTagRepository.findOne({
        name: tagname,
      });
      //기존에 태그가 존재한다면
      if (prevTag) {
        result3.push(prevTag);
      } else {
        // 기존 태그가 없다면
        const newTag = await this.productTagRepository.save({ name: tagname });
        result3.push(newTag);
      }
    }
    //========================================================
    const result1 = await this.productSalesLocationRespository.save({
      ...productSalesLocation,
    });
    // 등록과 네임도 잘 가져온다., 프로덕트 카테고리의 네임까지 프론트로 내보내줄 때
    const result2 = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });

    const return2Front = await this.productRepository.save({
      ...product,
      productSalesLocation: result1, // id를 얻기 위해 하는 것이다. sales의 ID, FK
      productCategory: result2,
      productTags: result3,
      // productCategory: { id: productCategoryId }, // 등록은 잘 되지만, 바로 등록 후 프론트에서 보여주질 못한다, 등록만 하고싶다할 때 이거 쓴다.
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
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;
    // 2. 소프트삭제 -1
    // await this.productRepository.update({ id: productId }, { isDeleted: true });
    // 3. 소프트삭제 -2
    // await this.productRepository.update(  { id: productId }, { deletedAt: new Date() }, );
    // 4.
    // await this.productRepository.softRemove({ id : productId}) // 아이디로만 삭제 가능

    // const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    // return result.affected ? true : false;
  }
}
