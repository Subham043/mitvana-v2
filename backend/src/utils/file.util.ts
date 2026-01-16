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

    //generate random filename
    public static async generateRandomFilename(): Promise<string> {
        return uuidv4();
    }

    //create directory in upload folder
    public static async createDirectoryInUploadFolder(folderName: string): Promise<string> {
        const path = join(FileHelperUtil.uploadPath, folderName);
        await fs.promises.mkdir(path, { recursive: true });
        return path;
    }

    //write file in upload folder
    public static async writeFileInUploadFolder(filePath: string, data: Buffer): Promise<string> {
        const path = join(FileHelperUtil.uploadPath, filePath);
        await fs.promises.writeFile(path, data);
        return path;
    }

    //write file in tmp folder
    public static async writeFileInTmpFolder(data: Buffer): Promise<{ filePath: string, fileName: string }> {
        const fileName = await FileHelperUtil.generateRandomFilename();
        const filePath = join(FileHelperUtil.tempFoldername, fileName);
        await FileHelperUtil.createDirectoryInUploadFolder(FileHelperUtil.tempFoldername);
        await FileHelperUtil.writeFileInUploadFolder(filePath, data);
        return { filePath, fileName };
    }

    //imp
    // ⬇️ stream → temp file (zero memory)
    public static async createTempFileFromStream(stream: MultipartFile['file']): Promise<{ filePath: string, fileName: string, fileSize: number }> {
        const fileName = await FileHelperUtil.generateRandomFilename();
        const filePath = join(FileHelperUtil.tempPath, fileName);
        await FileHelperUtil.createDirectoryInUploadFolder(FileHelperUtil.tempFoldername);
        await pipeline(stream, createWriteStream(filePath));
        const size = await FileHelperUtil.getFileSize(filePath);
        return { filePath, fileName, fileSize: size };
    }

    //read file from upload folder
    public static async readFileFromUploadFolder(filePath: string): Promise<NonSharedBuffer> {
        const path = join(FileHelperUtil.uploadPath, filePath);
        return await fs.promises.readFile(path);
    }

    //read file from tmp folder
    public static async readFileFromTmp(fileName: string): Promise<NonSharedBuffer> {
        const filePath = join(FileHelperUtil.tempFoldername, fileName);
        return await FileHelperUtil.readFileFromUploadFolder(filePath);
    }

    // create buffer from temp file
    // ⬇️ temp file → buffer (required for nativeFile)
    public static async createBufferFromTempFile(fileName: string): Promise<NonSharedBuffer> {
        return await FileHelperUtil.readFileFromTmp(fileName);
    }

    //delete file
    public static async deleteFile(path: string): Promise<void> {
        await fs.promises.unlink(path);
    }

    //delete file from upload folder
    public static async deleteFileFromUploadFolder(filePath: string): Promise<void> {
        const path = join(FileHelperUtil.uploadPath, filePath);
        await fs.promises.unlink(path);
    }

    //delete file from tmp folder
    public static async deleteFileFromTmp(fileName: string): Promise<void> {
        const filePath = join(FileHelperUtil.tempFoldername, fileName);
        await FileHelperUtil.deleteFileFromUploadFolder(filePath);
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
    public static async createFileInstanceFromTmpFile(fileName: string, fileType: string): Promise<File> {
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