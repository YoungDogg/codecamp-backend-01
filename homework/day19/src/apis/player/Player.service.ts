import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerInput } from './dto/createPlayer.input';
import { UpdatePlayerInput } from './dto/updatePlayer.input';
import { Player } from './entities/player.entity';
interface IFindOne {
  id: string;
}
interface ICreate {
  createPlayerInput: CreatePlayerInput;
}
interface IUpdate {
  id: string;
  updatePlayerInput: UpdatePlayerInput;
}

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async findAll() {
    const resultOfAllProducts = await this.playerRepository.find({});
    return resultOfAllProducts;
  }
  async findOne({ id }: IFindOne) {
    const resultOfProduct = await this.playerRepository.findOne({
      where: { id: id },
    });
    return resultOfProduct;
  }

  async create({ createPlayerInput }: ICreate) {
    const result = await this.playerRepository.save({
      ...createPlayerInput,
    });
    return result;
  }

  async update({ id, updatePlayerInput }: IUpdate) {
    // 프론트에 뭐가 업데이트 됐는지 안보여줄 때
    this.playerRepository.update(
      { id: id },
      { ...updatePlayerInput },
    );
  }

  async delete({ id }) {
    const result = await this.playerRepository.softDelete({ id: id }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false; // 바뀌면 참
  }
}
