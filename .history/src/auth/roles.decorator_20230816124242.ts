// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from './role.guard'; // Import your UserRole enum

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
