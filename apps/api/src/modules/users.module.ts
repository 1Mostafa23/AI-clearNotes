import { Module} from "@nestjs/common";
import { UsersRepository } from "@libs/db/repositories/users";
import { UsersService } from "src/services/user.service";

export const UsersRepositoryToken = Symbol('UsersRepositoryToken');

@Module({
    providers: [
        {
            provide: UsersRepositoryToken,
            useClass: UsersRepository
        },
        UsersService
    ],
    exports: [UsersRepositoryToken, UsersService]
})
export class UsersModule{}

