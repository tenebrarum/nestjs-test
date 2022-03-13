import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, SetMetadata, UseFilters, UseGuards } from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/metadata/roles.metadata';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCatDto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@SetMetadata('roles', ['admin'])
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  @Roles('admin')
  async create(@Body() createDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Cat> {
    return this.catsService.findbyId(id);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/exception')
  async exception(): Promise<Cat[]> {
    throw new CustomException();
  }
}
