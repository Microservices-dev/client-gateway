import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto } from './dto/';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.ordersClient
      .send('findAllOrders', { ...orderPaginationDto })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
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
