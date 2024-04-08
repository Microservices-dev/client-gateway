import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', { ...paginationDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Post()
  @HttpCode(201)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', { ...createOrderDto }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }
}
