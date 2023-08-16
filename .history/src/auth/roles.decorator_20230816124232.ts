// roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { UserRole } from './'; // Import your UserRole enum

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
