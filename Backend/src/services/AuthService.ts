import { IAuthService } from "@/interface/services/IAuthService";
import { inject, injectable } from "tsyringe";
import { IUserRepository } from "@/interface/repositories/IUserRepository";
import { IUser } from "@/models/user/userModel";
import { errorMessage } from "@/constant/errorMessage";
import { IBcryptService } from "@/utils/PasswordHasher/IPasswordHasher";
import { IJwtService } from "@/jwt/interface/IJwtService";

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject("IUserRepository") private _userRepository: IUserRepository,
    @inject("IBcryptService") private _bcryptService: IBcryptService,
    @inject("IJwtService") private _jwtService: IJwtService,
  ) {}
  async register(
    name: string,
    email: string,
    password: string,
    role?: "admin" | "user",
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    const ExistingUser = await this._userRepository.findByEmail(email);
    if (ExistingUser) {
      throw new Error(errorMessage.USER_ALREADY_EXISTS);
    }
    const hashedPassword = await this._bcryptService.hash(password);
    const user = await this._userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    const accessToken = this._jwtService.signAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this._jwtService.signRefreshToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    return { user, accessToken, refreshToken };
  }
  async login(
    email: string,
    password: string,
  ): Promise<{ user: IUser; accessToken: string; refreshToken: string }> {
    if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const adminUser = {
      _id: "admin",
      name: "Administrator",
      email,
      password: "",
      role: "admin" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const accessToken = this._jwtService.signAccessToken({
      _id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role,
    });

    const refreshToken = this._jwtService.signRefreshToken({
      _id: adminUser._id,
      email: adminUser.email,
      role: adminUser.role,
    });

    return {
      user: adminUser,
      accessToken,
      refreshToken,
    };
  }
    const user = await this._userRepository.findByEmail(email);
    if (!user) {
      throw new Error(errorMessage.USER_NOT_FOUND);
    }
    const isPasswordValid = await this._bcryptService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error(errorMessage.INVALID_PASSWORD);
    }
    const accessToken = this._jwtService.signAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = this._jwtService.signRefreshToken({
      _id: user._id,
      email: user.email,
      role: user.role,

    });
    return { user, accessToken, refreshToken };
  }
  async refreshToken(refreshToken: string): Promise<string> {
    const payload = this._jwtService.verifyRefreshToken(refreshToken);
    if (!payload) {
      throw new Error(errorMessage.INVALID_TOKEN);
    }
    const user = await this._userRepository.findById(payload._id);
    if (!user) {
      throw new Error(errorMessage.USER_NOT_FOUND);
    }
    const newAccessToken = this._jwtService.signAccessToken({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
    return newAccessToken;
  }
}
