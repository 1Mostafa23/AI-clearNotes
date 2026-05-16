import { users } from "@libs/db/schema/user.schema";
import { Module } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";
import { UsersModule } from "./users.module";
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [

        UsersModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async(configService: ConfigService)=>({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1d'},
            })
        }),
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{}
