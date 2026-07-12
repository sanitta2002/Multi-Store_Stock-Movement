import { injectable } from "tsyringe";
import { IBcryptService } from "./IPasswordHasher";
import * as bcrypt from 'bcrypt';

@injectable()
export class PasswordHasher implements IBcryptService{
async hash(password: string): Promise<string> {
    return await bcrypt.hash(password,10)
}
async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password,hashedPassword)
}
}