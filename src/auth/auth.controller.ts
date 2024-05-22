import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', { ...registerUserDto }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send('auth.register.ligin', { ...loginUserDto });
  }

  @Get('verify')
  verifyToken() {
    return this.client.send('auth.verify.user', { id: 1 });
  }
}
