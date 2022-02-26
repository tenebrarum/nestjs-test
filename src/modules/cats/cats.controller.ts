import { Body, Controller, Get, Param, Post, UseFilters } from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCatDto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  async create(@Body() createDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createDto);
  }

  @Get(':name')
  async findOne(@Param() params): Promise<Cat> {
    return this.catsService.findByName(params.name);
  }

  @Get()
  async findAll(): Promise<string> {
    // return 'This action returns all cats';
    throw new CustomException()
  }
}
