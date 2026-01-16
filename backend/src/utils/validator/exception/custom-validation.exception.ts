import { HttpException, HttpStatus } from "@nestjs/common";
import { errors } from "@vinejs/vine";

export class CustomValidationException extends HttpException {
    constructor(message: string, fieldName: string, rule: string) {
        super(message, HttpStatus.BAD_REQUEST);
        throw new errors.E_VALIDATION_ERROR([
            {
                "message": message,
                "rule": rule,
                "field": fieldName
            }
        ])
    }
}