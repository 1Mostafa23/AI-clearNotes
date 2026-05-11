import { UsersService } from "./user.service";
import { Injectable, BadRequestException, UnauthorizedException } from "@nestjs/common";
import { CryptoUtil } from "src/common/utils/crypto.util";

@Injectable()
export class AuthService{
    constructor(private readonly data: UsersService){}

    async register(dto: any){
        
    }
}