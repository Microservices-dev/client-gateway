import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  readonly totalAmount: number;

  @IsNumber()
  @IsPositive()
  totalItems: number;

  @IsEnum(OrderStatus, {
    message: `Status must be one of these: ${OrderStatus.PENDING}, ${OrderStatus.COMPLETED}, ${OrderStatus.DELIVERED}, ${OrderStatus.CANCELLED}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
