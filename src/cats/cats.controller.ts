import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/CreateCatDto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

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
    return 'This action returns all cats';
  }
}
