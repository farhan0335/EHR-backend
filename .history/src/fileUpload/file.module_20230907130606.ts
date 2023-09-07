import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fileService } from './file.service';
import { Files } from './entity/file.entity';
import { FilesController} from './file.controller'; // Import the FilesController
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [TypeOrmModule.forFeature([Files]),
  MulterModule.register({
    dest: './files', // Specify the destination directory for uploaded files
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'files')
  })
  
],
  controllers: [FilesController], // Add FilesController to the controllers array
  providers: [fileService],
})
export class AppModule {}