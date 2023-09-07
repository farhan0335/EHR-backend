import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './entity/file.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Files)
    private readonly imageRepository: Repository<Files>,
  ) {}

  async getImages(): Promise<Files[]> {
    return this.imageRepository.find();
  }

  async createImage(files: Files): Promise<Files> {
    return this.imageRepository.save(image);
  }

  async getImage(id: number): Promise<Files> {
    return this.imageRepository.findOneBy({ id });
  }

  async deleteImage(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
