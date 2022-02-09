import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '../brand/entities/brand.entity';
import { ProductCategory } from '../productCategory/entities/productCategory.entity';
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
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    //==================내 것=================
    @InjectRepository(Brand)
    private readonly productBrandRepository: Repository<Brand>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.productRepository.find({
      relations: ['productSalesLocation', 'productCategory'],
    });
    return resultOfAllProducts;
  }
  async findOne({ productId }: IFindOne) {
    const resultOfProduct = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['productSalesLocation', 'productCategory'], // salesLocation이랑 같이 조회할 거이다.
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createProductInput }: ICreate) {
    // =====================what I did =======================
    //브랜드Id를 등록한다.
    const { id, productSalesLocation, productCategoryId, ...product } =
      createProductInput;
    const prdBrand = await this.productBrandRepository.save({
      id,
    });
    const prdSales = await this.productSalesLocationRespository.save({
      ...productSalesLocation,
    });
    // 등록과 네임도 잘 가져온다., 프로덕트 카테고리의 네임까지 프론트로 내보내줄 때
    const prdCateId = await this.productCategoryRepository.findOne({
      id: productCategoryId,
    });
    const return2Front = await this.productRepository.save({
      ...product,
      productSalesLocation: prdSales,
      productCategory: prdCateId,
      //================what I did================
      brand: prdBrand,
      //==========================================
    });

    return return2Front;
  }
  async update({ productId, updateProductInput }: IUpdate) {
    const product = await this.productRepository.findOne({ id: productId });
    const newProduct = {
      ...product,
      ...updateProductInput, // updateProduct.iput.ts에서
    };

    const result = await this.productRepository.save(newProduct);
    return result + '수정이 완료되었습니다';

    // this.productRepository.update({ id: productId }, { ...updateProductInput });
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({ id: productId });
    if (typeof product.stock !== 'number' && !product.stock)
      // 재고가 0
      throw new UnprocessableEntityException();
    else if (product.stock === 0) return product.id + 'sold out';
  }

  async delete({ productId }) {
    // 1. 진짜 삭제
    const result = await this.productRepository.delete({ id: productId });
    return result.affected ? true : false;

    // const result2 = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능
    // return result2.affected ? true : false;
  }
}
