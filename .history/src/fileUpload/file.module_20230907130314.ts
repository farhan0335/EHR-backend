import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fileService } from './file.service';
import { Files } from './entity/file.entity';
import { FilesController} from './file.controller'; // Import the FilesController
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Files]),
  MulterModule.register({
    dest: './uploads', // Specify the destination directory for uploaded files
  }),

  Additionally, make sure you have the required Multer dependencies installed in your project.

With these considerations, your AppModule should work well for handling file uploads and related functionality. Double-check your service naming and ensure that your controller and service are properly configured and imported.

],
  controllers: [FilesController], // Add FilesController to the controllers array
  providers: [fileService],
})
export class AppModule {}