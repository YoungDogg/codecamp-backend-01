import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMainCategoryInput } from './dto/createMainCategory.input';
import { UpdateMainCategoryInput } from './dto/updateMainCategory.input';
import { MainCategory } from './entities/mainCategory.entity';

interface IFindOne {
  id: string;
}
interface ICreate {
  createMainCategoryInput: CreateMainCategoryInput;
}
interface IUpdate {
  id: string;
  updateMainCategoryInput: UpdateMainCategoryInput;
}

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.mainCategoryRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.mainCategoryRepository.findOne({
      where: { id: id },
      // where: { deletedAt: null },
    });
    return resultOfProduct;
  }

  async create({ createMainCategoryInput }: ICreate) {
    const result = await this.mainCategoryRepository.save({
      ...createMainCategoryInput,
    });
    return result;
  }

  async update({ id, updateMainCategoryInput }: IUpdate) {
    this.mainCategoryRepository.update(
      { id: id },
      { ...updateMainCategoryInput },
    );
  }

  async delete({ id }) {
    const result = await this.mainCategoryRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
