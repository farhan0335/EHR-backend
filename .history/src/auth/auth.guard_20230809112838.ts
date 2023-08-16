import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { UserService } from "src/user/user.service";
@Injectable()
export class LocalAuthGuard implements CanActivate {
    constructor(
        private readonly jwtservice : JwtService,
        private readonly userService : UserService

    ){}
    canActivate(context: ExecutionContext): Promise<boolean>  {
        const request = context.switchToHttp().getRequest();
        const access_token = request.headers.authorization.replace('Bearer', '');
        if(!access_token) {
            throw new UnauthorizedException('Access Token not found');

        }
        try {
            
        }
        throw new Error("Method not implemented.");
    }
    
}