import { JwtPayload } from "src/auth/auth.types";
import { ProfileDto } from "../schema/profile.schema";
import { UpdatePasswordDto } from "../schema/update_password.schema";
import { VerifyProfileDto } from "../schema/verify_profile.schema";

export interface AccountServiceInterface {
    updateProfile(id: string, profileDto: ProfileDto): Promise<JwtPayload>;
    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<void>;
    verifyProfile(id: string, verifyProfileDto: VerifyProfileDto): Promise<void>;
}