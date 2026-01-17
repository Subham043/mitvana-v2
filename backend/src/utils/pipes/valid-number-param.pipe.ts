import {
    PipeTransform,
    Injectable,
} from '@nestjs/common';
import { CustomValidationException } from '../validator/exception/custom-validation.exception';

@Injectable()
export class ValidNumberParamPipe implements PipeTransform {
    async transform(value: number) {
        if (!value) throw new CustomValidationException("Parameter is required", "parameter", "required");
        if (isNaN(value)) throw new CustomValidationException("Parameter must be a number", "parameter", "invalid");
        return Number(value);
    }
}