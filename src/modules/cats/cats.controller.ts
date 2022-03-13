import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, SetMetadata, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomException } from 'src/exceptions/custom.exception';
import { HttpExceptionFilter } from 'src/filters/httpException.filter';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/createCatDto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@SetMetadata('roles', ['admin'])
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) { }

  @Post()
  // @Roles('admin')
  async create(@Body() createDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createDto);
  }

  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Cat> {
    return this.catsService.findbyId(id);
  }

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get('/exception')
  async exception(): Promise<Cat[]> {
    throw new CustomException();
  }
}
