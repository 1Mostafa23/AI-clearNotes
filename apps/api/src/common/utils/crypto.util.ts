import * as bcrypt from 'bcrypt';
export class  CryptoUtil {

    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
        return bcrypt.hash(password, salt);
    }
    static async comparePasswords(password: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(password, hash);
    }
    
}