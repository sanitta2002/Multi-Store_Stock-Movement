import { injectable } from "tsyringe";
import { IJwtService } from "../interface/IJwtService";
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from "../payload/JwtPayload";
@injectable()
export class JwtService implements IJwtService {
    signAccessToken(payload: JwtPayload): string {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ;
        
        return jwt.sign(payload, accessTokenSecret as string, { expiresIn : "15m"});
    }
    signRefreshToken(payload: JwtPayload): string {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET ;
        return jwt.sign(payload, refreshTokenSecret as string, { expiresIn : "7d" });
    }
    verifyAccessToken(token: string): JwtPayload | null {
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ;
        try {
            const decoded = jwt.verify(token, accessTokenSecret as string) as JwtPayload;
            return decoded;
        } catch (error) {
            return null;
        }
    }
    verifyRefreshToken(token: string): JwtPayload | null {
        const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
        try {
            const decoded = jwt.verify(token, refreshTokenSecret as string) as JwtPayload;
            return decoded;
        } catch (error) {
            return null;
        }
    }
}