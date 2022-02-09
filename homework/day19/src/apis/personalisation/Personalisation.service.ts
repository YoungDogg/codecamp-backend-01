import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePersonalisationInput } from './dto/createPersonalisation.input';
import { UpdatePersonalisationInput } from './dto/updatePersonalisation.input';
import { Personalisation } from './entities/personalisation.entity';
interface IFindOne {
  id: string;
}
interface ICreate {
  createPersonalisationInput: CreatePersonalisationInput;
}
interface IUpdate {
  id: string;
  updatePersonalisationInput: UpdatePersonalisationInput;
}

@Injectable()
export class PersonalisationService {
  constructor(
    @InjectRepository(Personalisation)
    private readonly personalisationRepository: Repository<Personalisation>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.personalisationRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.personalisationRepository.findOne({
      where: { id: id },
    });
    return resultOfProduct;
  }

  async create({ createPersonalisationInput }: ICreate) {
    const result = await this.personalisationRepository.save({
      ...createPersonalisationInput,
    });
    return result;
  }

  async update({ id, updatePersonalisationInput }: IUpdate) {
    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.personalisationRepository.update(
      { id: id },
      { ...updatePersonalisationInput },
    );
  }

  async delete({ id }) {
    const result = await this.personalisationRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false; // 바뀌면 참
  }
}
