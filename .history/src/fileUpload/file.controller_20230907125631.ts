// files.controller.ts

import { Controller, Get, Post, Param, Delete, HttpCode, HttpStatus, UploadedFile, UseInterceptors, BadRequestException, NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { Files } from './entity/file.entity';

@Controller('files')
export class FilesController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getImages(): Promise<Files[]> {
    return this.appService.getImages();
  }

  @Get(':id')
  async getImage(@Param('id') id: number): Promise<Files> {
    const file = await this.appService.getImage(id);

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

    return this.appService.createImage(file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteImage(@Param('id') id: number): Promise<void> {
    const file = await this.appService.getImage(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    await this.appService.deleteImage(id);
  }
}
