import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './';
import { Files } from './entity/file.entity';
import { FilesController } from './files.controller'; // Import the FilesController

@Module({
  imports: [TypeOrmModule.forFeature([Files])],
  controllers: [FilesController], // Add FilesController to the controllers array
  providers: [AppService],
})
export class AppModule {}