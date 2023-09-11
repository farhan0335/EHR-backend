import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from ''; // Import your user service

@Injectable()
export class IsActiveMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Get the user ID from the request (you may need to adjust this based on your authentication setup)
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
