import { SetMetadata } from '@nestjs/common';

export const Role = (role: "USER" | "ADMIN") => SetMetadata('roles', role);