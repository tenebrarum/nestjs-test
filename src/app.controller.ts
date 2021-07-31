import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() body: { name: string }): { name: string } {
    if (body.name === 'Error') {
      throw new HttpException(
        'You have the wrong name',
        HttpStatus.BAD_REQUEST,
      );
    }

    return body;
  }
}
