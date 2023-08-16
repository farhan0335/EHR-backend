import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { UserRole } from "src/user/user-roles.enum";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private reflector: 
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<UserRole>
        throw new Error("Method not implemented.");
    }
    
}