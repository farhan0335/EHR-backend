import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service'; // Import your user service

@Injectable()
export class IsActiveMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const userId = (req.user as { id: number }).id; 

    const user = await this.usersService.findById(userId);

    if (!user.isActive) {
      return res.status(403).json({ message: 'User is not active' });
    }

]\
  }
}
