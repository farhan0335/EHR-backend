// file-upload.interceptor.ts

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MulterOptions, Multer } from 'multer';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private readonly multerOptions: MulterOptions) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const response = httpContext.getResponse();

    return new Observable((observer) => {
      const multer = Multer(this.multerOptions);

      multer.single('file')(request, response, async (err) => {
        if (err) {
          observer.error(err);
        } else {
          await next.handle().subscribe({
            next: (data) => observer.next(data),
            error: (error) => observer.error(error),
            complete: () => observer.complete(),
          });
        }
      });
    });
  }
}
