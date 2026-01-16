import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { VineValidator } from '@vinejs/vine';
import { FastifyReply, FastifyRequest } from 'fastify';
import { FileHelperUtil } from '../file.util';

export interface MultipartFileMeta {
    fieldName: string;
    fileName: string;
    fileMimeType: string;
    fileEncoding: string;
    fileTempPath: string;
    fileTempName: string;
    fileTempSize: number;
}

const cleanupTempFiles = async (tempFiles: MultipartFileMeta[]) => {
    if (tempFiles.length === 0) return;
    await Promise.all(
        tempFiles.map(f =>
            FileHelperUtil.deleteFile(f.fileTempPath).catch(() => undefined),
        ),
    );
}

export const VineMultipart = <T>(validator: VineValidator<any, any>) =>
    createParamDecorator(async (_: unknown, ctx: ExecutionContext): Promise<T> => {
        const request = ctx.switchToHttp().getRequest<FastifyRequest>();
        const reply = ctx.switchToHttp().getResponse<FastifyReply>();

        if (!request.isMultipart()) {
            throw new BadRequestException('multipart/form-data required');
        }

        const fields: Record<string, any> = {};
        const vineFields: Record<string, any> = {};
        const tempFiles: MultipartFileMeta[] = [];

        try {
            for await (const part of request.parts()) {
                if (part.type === 'file') {

                    // ⬇️ stream → temp file (zero memory)
                    const fileInfo = await FileHelperUtil.createTempFileFromStream(part.file);

                    //   // ⬇️ temp file → buffer (required for nativeFile)
                    //   const buffer = await FileHelperUtil.createBufferFromTempFile(fileInfo.fileName);

                    // ✅ REAL File instance (vine.nativeFile works)
                    const file = await FileHelperUtil.createTmpFileFromBuffer(fileInfo.fileName, part.mimetype);

                    const fileMeta = {
                        fieldName: part.fieldname,
                        fileName: part.filename,
                        fileMimeType: part.mimetype,
                        fileTempPath: fileInfo.filePath,
                        fileTempName: fileInfo.fileName,
                        fileTempSize: fileInfo.fileSize,
                        fileEncoding: part.encoding,
                    };

                    // ✅ support multiple files per field
                    if (vineFields[part.fieldname]) {
                        vineFields[part.fieldname] = Array.isArray(vineFields[part.fieldname])
                            ? [...vineFields[part.fieldname], file]
                            : [vineFields[part.fieldname], file];
                        fields[part.fieldname] = Array.isArray(fields[part.fieldname])
                            ? [...fields[part.fieldname], fileMeta]
                            : [fields[part.fieldname], fileMeta];
                    } else {
                        vineFields[part.fieldname] = file;
                        fields[part.fieldname] = fileMeta;
                    }

                    tempFiles.push(fileMeta);
                } else {
                    vineFields[part.fieldname] = part.value;
                    fields[part.fieldname] = part.value;
                }
            }

            // ✅ vine.nativeFile() validation
            (await validator.validate(vineFields));
            return fields as T;

        } catch (error) {
            await cleanupTempFiles(tempFiles);
            throw error;
        } finally {
            // 🧹 cleanup AFTER response
            reply.raw.on('finish', async () => {
                await cleanupTempFiles(tempFiles);
            });
            reply.raw.on('close', async () => {
                await cleanupTempFiles(tempFiles);
            });
        }

    })();
