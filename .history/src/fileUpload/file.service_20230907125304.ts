import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from './entity/file.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Files)
    private readonly imageRepository: Repository<>,
  ) {}

  async getImages(): Promise<Image[]> {
    return this.imageRepository.find();
  }

  async createImage(image: Image): Promise<Image> {
    return this.imageRepository.save(image);
  }

  async getImage(id: number): Promise<Image> {
    return this.imageRepository.findOneBy({ id });
  }

  async deleteImage(id: number): Promise<void> {
    await this.imageRepository.delete(id);
  }
}
