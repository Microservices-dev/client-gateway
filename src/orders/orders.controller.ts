import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { ORDERS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto/';

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

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.ordersClient
      .send('changeOrderStatus', {
        id,
        status: statusDto.status,
      })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
