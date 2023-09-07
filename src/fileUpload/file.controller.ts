// files.controller.ts

import { Controller, Get, Post, Param, Delete, HttpCode, HttpStatus, UploadedFile, UseInterceptors, BadRequestException, NotFoundException, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileService } from './file.service';
import { Files } from './entity/file.entity';
import { diskStorage } from 'multer';
import * as path from 'path'
import { Response } from 'express';



interface FileParams{
    filename : string;
}

@Controller('files')
export class FilesController {
  constructor(private readonly FileService: fileService) {}

  @Get()
  async getImages(): Promise<Files[]> {
    return this.FileService.getImages();
  }

  @Get(':id')
  async getImage(@Param('id') id: number): Promise<Files> {
    const file = await this.FileService.getImage(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createImage(@UploadedFile() file: Files): Promise<Files> {
    if (!file) {
      throw new BadRequestException('Invalid file upload');
    }

    return this.FileService.createImage(file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') id: number): Promise<void> {
    const file = await this.FileService.getImage(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this.FileService.deleteImage(id);
  }
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage : diskStorage({
        destination : './uploads',
        filename : (req, file, cb) =>{
            cb(null, `${file.originalname}`)
        }
    })
  }))
  async uploadfile(){
    return "success";
  }
  @Get('/File')
  async getFile(@Res() res : Response, @Body() file : FileParams){
    res.sendFile(path.join(__dirname, "./../uploads" + file.filename))
  }

// @Get('/Get/:filename')
// async getFile(@Param('filename') filename: string, @Res() res: Response) {
//     const filePath = path.join(__dirname, '../../uploads', filename);

//     // Send the file as a response
//     res.sendFile(filePath, (err) => {
//       if (err) {
//         // Handle errors here, e.g., file not found
//         res.status(404).send('File not found');
//       }
//     });
//   }
}
