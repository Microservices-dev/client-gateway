import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../enum/order.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `Valid status are ${OrderStatus.PENDING}, ${OrderStatus.CONFIRMED}, ${OrderStatus.PAID}, ${OrderStatus.DELIVERED}, ${OrderStatus.CANCELLED}`,
  })
  status: OrderStatus;
}
