import { Injectable } from '@nestjs/common';

// Сервис - вид/способ/заготовка реализации бизнес логики
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  logGetHello() {
    console.log(this.getHello());
  }
}
