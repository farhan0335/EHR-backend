import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fileService } from './file.service';
import { Files } from './entity/file.entity';
import { FilesController} from './file.controller'; // Import the FilesController
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FilesController], // Add FilesController to the controllers array
  providers: [fileService],
})
export class AppModule {}