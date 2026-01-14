import { HttpException, HttpStatus } from "@nestjs/common";
import { errors } from "@vinejs/vine";

export class UniqueFieldException extends HttpException {
    constructor(message: string, fieldName: string) {
        super(message, HttpStatus.BAD_REQUEST);
        throw new errors.E_VALIDATION_ERROR([
            {
                "message": `The ${fieldName} is already taken`,
                "rule": "unique",
                "field": fieldName
            }
        ])
    }
}