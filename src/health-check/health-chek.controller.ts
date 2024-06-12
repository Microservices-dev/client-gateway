import { Controller, Get } from '@nestjs/common';

@Controller('')
export class HealthChekController {
  @Get()
  healthCheck() {
    return 'Client Gateway is up and running!';
  }
}
