import { JwtPayload } from "src/auth/auth.types";

export type ProfileEntity = JwtPayload
export type UpdateProfileEntity = Omit<ProfileEntity, 'id' | 'is_admin' | 'is_verified' | 'email_verified_at' | 'is_blocked' | 'password'> & { verification_code?: string, email_verified_at?: Date | null; }