import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateImageInput } from './dto/createImage.input';
import { UpdateImageInput } from './dto/updateImage.input';
import { Image } from './entities/image.entity';
interface IFindOne {
  id: string;
}
interface ICreate {
  createImageInput: CreateImageInput;
}
interface IUpdate {
  id: string;
  updateImageInput: UpdateImageInput;
}

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.imageRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.imageRepository.findOne({
      where: { id: id },
    });
    return resultOfProduct;
  }

  async create({ createImageInput }: ICreate) {
    const result = await this.imageRepository.save({
      ...createImageInput,
    });
    return result;
  }

  async update({ id, updateImageInput }: IUpdate) {
    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.imageRepository.update({ id: id }, { ...updateImageInput });
  }

  async delete({ id }) {
    const result = await this.imageRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false; // 바뀌면 참
  }
}
