
import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { VineValidator } from '@vinejs/vine';

export class VineValidationPipe implements PipeTransform {
    constructor(private validator: VineValidator<any, any>) { }

    async transform(value: unknown, metadata: ArgumentMetadata) {
        try {
            const parsedValue = await this.validator.validate(value);
            return parsedValue;
        } catch (error) {
            throw error
        }
    }
}
