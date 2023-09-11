import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service'; // Import your user service

@Injectable()
export class IsActiveMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {

    const userId = req.user.id; // Assuming you have the user object in the request

    // Fetch the user from the database
    const user = await this.usersService.findById(userId);

    // Check if the user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'User is not active' });
    }

    next();
  }
}
