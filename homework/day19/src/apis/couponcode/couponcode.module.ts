import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponCodeService } from './couponcode.service'; 
import { CouponCodeResolver } from './couponcode.resolver';
import { CouponCode } from './entities/couponcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponCode])],
  //   controllers: [AppController],
  providers: [CouponCodeResolver, CouponCodeService],
})
export class CouponCodeModule {}
