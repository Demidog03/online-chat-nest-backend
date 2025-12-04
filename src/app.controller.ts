import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Контроллер - обработка HTTP запросов
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/test')
  getHello(): string {
    this.appService.logGetHello();
    return this.appService.getHello();
  }
}
