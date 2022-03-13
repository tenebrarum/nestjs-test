import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { CreateCatDto } from './dto/createCatDto';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  findByName(name: string): Cat {
    return this.cats.find((cat) => cat.name === name);
  }

  findbyId(id: number): Cat {
    return this.cats.find((cat) => cat.id === id);
  }


  create(createDto: CreateCatDto): Cat {
    const newDto = {
      ...createDto,
      id: randomInt(1000000),
    };
    this.cats.push(newDto);
    return newDto;
  }

  findAll() {
    return this.cats;
  }
}
