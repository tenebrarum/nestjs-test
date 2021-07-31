import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './cats/dto/createCatDto';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findByName(name: string): Cat {
    return this.cats.find((cat) => cat.name === name);
  }

  create(createDto: CreateCatDto): Cat {
    this.cats.push(createDto);
    return createDto;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
