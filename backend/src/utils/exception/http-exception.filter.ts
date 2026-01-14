import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();

        const path = request.url;

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            message = typeof res === 'string' ? res : res['message'];
        }

        response.status(status).send({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path,
            message,
        });
    }
}
