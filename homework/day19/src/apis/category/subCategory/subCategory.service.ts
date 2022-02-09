import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubCategoryInput } from './dto/createSubCategory.input';
import { UpdateSubCategoryInput } from './dto/updateSubCategory.input';
import { SubCategory } from './entities/subCategory.entity';

interface IFindOne {
  id: string;
}
interface ICreate {
  createSubCategoryInput: CreateSubCategoryInput;
}
interface IUpdate {
  id: string;
  updateSubCategoryInput: UpdateSubCategoryInput;
}

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.subCategoryRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.subCategoryRepository.findOne({
      where: { id: id },
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createSubCategoryInput }: ICreate) {
    const result = await this.subCategoryRepository.save({
      ...createSubCategoryInput,
    });
    return result;
  }

  async update({ id, updateSubCategoryInput }: IUpdate) {
    this.subCategoryRepository.update(
      { id: id },
      { ...updateSubCategoryInput },
    );
  }

  async delete({ id }) {
    const result = await this.subCategoryRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
