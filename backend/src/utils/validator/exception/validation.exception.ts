
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { errors } from '@vinejs/vine'
import { ValidationError } from '@vinejs/vine/build/src/errors/validation_error';
import { FastifyReply } from 'fastify';

@Catch(errors.E_VALIDATION_ERROR)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const status = exception.status;
        const message = exception.message;
        const messages = exception.messages;
        const path = ctx.getRequest().url;

        return response
            .status(status)
            .send({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path,
                message,
                errors: messages,
            });
    }
}