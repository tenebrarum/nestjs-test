import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { Cat } from "src/modules/cats/interfaces/cat.interface";
import { ObjectSchema } from 'joi'

@Injectable()
export class JoiValidationPipe implements PipeTransform<any, Cat> {
    constructor(private schema: ObjectSchema) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const { error } = this.schema.validate(value)
        if(error) {
            throw new BadRequestException('Validation failed')
        }
        return value;
    }
}