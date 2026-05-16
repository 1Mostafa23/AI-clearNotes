import { db } from "@libs/db/client";
import { UsersService } from "./user.service";
import { Injectable, BadRequestException, UnauthorizedException, ConflictException, Inject } from "@nestjs/common";
import { CryptoUtil } from "src/common/utils/crypto.util";
import { RegisterDTO } from "src/common/validators/register-user.schema";
import type { IUserRepository, UsersRepository } from "@libs/db/repositories/users";
import id from "zod/v4/locales/id.cjs";
import { users } from "@libs/db/schema/user.schema";
import { UsersRepositoryToken } from "src/modules/users.module";
import { jwt } from "zod";
import { LoginDTO } from "src/common/validators/login-user.schema";



@Injectable()
export class AuthService{
    constructor(@Inject(UsersRepositoryToken) private readonly userRepo: IUserRepository){}

    async register(dto: RegisterDTO){
        const user = await this.userRepo.findByEmail(dto.email);
        if (!user){
            throw new UnauthorizedException('User with this email already exists')
        }
        const hashedPassword = await CryptoUtil.hashPassword(dto.password);
        return await this.userRepo.createUser({
            email: dto.email,
            name: dto.name,
            password_hash: hashedPassword,
        })
    }
    async login(dto: LoginDTO){
        const user = await this.userRepo.findByEmail(dto.email);
        if(!user) throw new ConflictException('this email does not exist');
        const targetUser = user;
        const correctPassword = await CryptoUtil.comparePasswords(dto.password, targetUser.password_hash );
    }
}