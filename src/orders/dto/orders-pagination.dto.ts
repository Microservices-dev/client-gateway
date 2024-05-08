import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus } from '../enum/order.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `status must be a valid enum value ${OrderStatus.PENDING}, ${OrderStatus.PAID}, ${OrderStatus.CONFIRMED}, ${OrderStatus.DELIVERED}, ${OrderStatus.CANCELLED}`,
  })
  status?: OrderStatus;
}
