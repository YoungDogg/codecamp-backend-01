import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../product/entities/product.entity';
import { User } from '../user/entities/user.entity';
import { Order } from './entities/order.entity';
// import {IFindOne} from '../product/product.service'
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRespository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async findAll() {
    return await this.orderRespository.find();
  }

  findOne({ id }) {
    this.orderRespository.findOne({ id });
  }

  async create({ email, productId, status }) {
    const user = await (await this.userRepository.findOne({ email })).id;
    if (!user) throw new UnprocessableEntityException('없는 이용자입니다');

    const product = await (
      await this.productRepository.findOne({ id: productId })
    ).id;
    if (!product) throw new UnprocessableEntityException('없는 물품입니다');

    return await this.orderRespository.save({
      userId: user,
      productId: product,
      status,
    });
  }

  //   async update({ id, email, productId, status }) {
  //     const order = await (await this.orderRespository.findOne({ id })).id;
  //     if (!order) throw new UnprocessableEntityException('없는 주문입니다');
  //     const user = await (await this.userRepository.findOne({ email })).id;
  //     if (!user) throw new UnprocessableEntityException('없는 이용자입니다');
  //     const product = await this.productRepository.findOne({ id: productId });
  //     if (!product) throw new UnprocessableEntityException('없는 물품입니다');

  //     return await this.orderRespository.save({ id, email, productId, status });
  //   }
}
