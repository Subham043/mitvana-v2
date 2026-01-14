import { HttpException, HttpStatus } from "@nestjs/common";
import { errors } from "@vinejs/vine";

export class PasswordNotSameException extends HttpException {
    constructor(message: string, fieldName: string) {
        super(message, HttpStatus.BAD_REQUEST);
        throw new errors.E_VALIDATION_ERROR([
            {
                "message": message,
                "rule": "password_not_same",
                "field": fieldName
            }
        ])
    }
}