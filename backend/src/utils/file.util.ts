import { extname, join } from 'path';
import * as fs from 'fs';
import { createWriteStream } from 'fs';
import { pipeline } from 'stream/promises';
import { v4 as uuidv4 } from 'uuid';
import { MultipartFile } from '@fastify/multipart';
import { MultipartFileMeta } from './decorator/vine-multipart.decorator';

export class FileHelperUtil {
    public static readonly rootPath: string = process.cwd();
    public static readonly uploadFoldername: string = 'uploads';
    public static readonly uploadPath: string = join(FileHelperUtil.rootPath, FileHelperUtil.uploadFoldername);
    public static readonly mailTemplateFoldername: string = 'src/mail/templates';
    public static readonly mailTemplatePath: string = join(FileHelperUtil.rootPath, FileHelperUtil.mailTemplateFoldername);
    public static readonly tempFoldername: string = 'tmp';
    public static readonly tempPath: string = join(FileHelperUtil.uploadPath, FileHelperUtil.tempFoldername);

    public static async generateRandomFilename(): Promise<string> {
        return uuidv4();
    }

    public static async createDirectory(folderName: string): Promise<void> {
        await fs.promises.mkdir(join(FileHelperUtil.uploadPath, folderName), { recursive: true });
    }

    public static async writeFile(path: string, data: Buffer): Promise<void> {
        await fs.promises.writeFile(path, data);
    }

    public static async writeFileInTmp(data: Buffer): Promise<{ filePath: string, fileName: string }> {
        const fileName = await FileHelperUtil.generateRandomFilename();
        const filePath = join(FileHelperUtil.tempPath, fileName);
        await FileHelperUtil.createDirectory(FileHelperUtil.tempFoldername);
        await FileHelperUtil.writeFile(filePath, data);
        return { filePath, fileName };
    }

    // ⬇️ stream → temp file (zero memory)
    public static async createTempFileFromStream(stream: MultipartFile['file']): Promise<{ filePath: string, fileName: string, fileSize: number }> {
        const fileName = await FileHelperUtil.generateRandomFilename();
        const filePath = join(FileHelperUtil.tempPath, fileName);
        await FileHelperUtil.createDirectory(FileHelperUtil.tempFoldername);
        await pipeline(stream, createWriteStream(filePath));
        const size = await FileHelperUtil.getFileSize(filePath);
        return { filePath, fileName, fileSize: size };
    }

    public static async readFile(path: string): Promise<NonSharedBuffer> {
        return await fs.promises.readFile(path);
    }

    public static async readFileFromTmp(fileName: string): Promise<NonSharedBuffer> {
        const filePath = join(FileHelperUtil.tempPath, fileName);
        return await FileHelperUtil.readFile(filePath);
    }

    // ⬇️ temp file → buffer (required for nativeFile)
    public static async createBufferFromTempFile(fileName: string): Promise<NonSharedBuffer> {
        const filePath = join(FileHelperUtil.tempPath, fileName);
        return await FileHelperUtil.readFile(filePath);
    }

    public static async deleteFile(path: string): Promise<void> {
        await fs.promises.unlink(path);
    }

    public static async deleteFileFromTmp(fileName: string): Promise<void> {
        const filePath = join(FileHelperUtil.tempPath, fileName);
        await FileHelperUtil.deleteFile(filePath);
    }

    public static async moveFile(source: string, destination: string): Promise<void> {
        await fs.promises.rename(source, destination);
    }

    public static async copyFile(source: string, destination: string): Promise<void> {
        await fs.promises.copyFile(source, destination);
    }

    public static async renameFile(source: string, destination: string): Promise<void> {
        await fs.promises.rename(source, destination);
    }

    public static async getFileExtension(fileName: string): Promise<string> {
        return fileName.split('.').pop() || '';
    }

    public static async getFileName(fileName: string): Promise<string> {
        return fileName.split('.')[0];
    }

    public static async getFileSize(path: string): Promise<number> {
        const stats = await fs.promises.stat(path);
        return stats.size;
    }

    public static async getFileMimeType(path: string): Promise<string> {
        const mimeType = await FileHelperUtil.getFileExtension(path);
        return mimeType;
    }

    // ✅ REAL File instance (vine.nativeFile works)
    public static async createTmpFileFromBuffer(fileName: string, fileType: string): Promise<File> {
        const buffer = await FileHelperUtil.createBufferFromTempFile(fileName);
        return new File(
            [buffer],
            fileName,
            { type: fileType },
        );
    }

    public static async saveFile(file: MultipartFileMeta): Promise<string> {
        const ext = extname(file.fileName) || '';
        const finalName = `${file.fileTempName}${ext}`;

        const targetDir = join(
            FileHelperUtil.uploadPath,
            finalName
        );

        await FileHelperUtil.copyFile(file.fileTempPath, targetDir);
        return finalName;
    }

}