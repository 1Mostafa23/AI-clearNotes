import { UsersRepositoryToken } from 'src/modules/users.module';
import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { type IUserRepository } from '@libs/db/repositories/users';
import { validatePassword } from 'src/common/validators/password.validator-exampleONLY';
import * as bcrypt from 'bcrypt';
import { success } from 'zod';
import { CryptoUtil } from 'src/common/utils/crypto.util';
import {
  ChangePasswordSchema,
  ChangePasswordDTO,
} from 'src/common/validators/change-password.schema';



@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepositoryToken) private readonly userRepo: IUserRepository,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    // деструктуризация
    // const { password_hash, ...userProfile } = user;
    // return userProfile;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    };
  }
  async updateName(userId: string, newName: string) {
    const normalizedName = newName.trim();

    if (!normalizedName) {
      throw new BadRequestException('name cannot be empty');
    }

    if (normalizedName.length >= 50) {
      throw new BadRequestException('name is too long');
    }

    // 1. сначала достаём пользователя
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // 2. проверяем изменилось ли
    if (user.name === normalizedName) {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      };
    }

    // 3. только теперь обновляем
    const updatedUser = await this.userRepo.updateName(userId, normalizedName);

    if (!updatedUser) throw new NotFoundException('User update failed');

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      created_at: updatedUser.created_at,
    };
  }
  async changePassword(userId: string, data: ChangePasswordDTO) {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundException('user not found');

    /*validatePassword(newpassword); проверка условии пароля через обычные ифы , засовывая все случаи в массив, метод найдете в папке validators =)
    const validatepassword = ChangePasswordSchema.parse(data);*/

    //if(newpassword === oldpassword) throw new BadRequestException(''); // неправильно и небезопасно, лучше хэш проверять к паролю
    const IsOldCorrect = await CryptoUtil.comparePasswords(
      data.oldPassword,
      user.password_hash,
    );
    if (!IsOldCorrect)
      throw new BadRequestException('ur old password doesnt match'); // сравниваем старый пароль с тем ххэээшэм , что уже есть в базе, если не совпало, то не даем менять пароль, так как старый пароль не совпал

    const isNewSameAsCurrent = await CryptoUtil.comparePasswords(
      data.password,
      user.password_hash,
    ); // сравниваем новый пароль с тем ххэээшэм , что уже есть в базе
    if (isNewSameAsCurrent)
      throw new BadRequestException(
        'new password cannot be similar with old password',
      ); // проверяем новый пароль с тем что уже есть в базе, если совпало, то не даем менять на такой же

    const hashedPassword = await CryptoUtil.hashPassword(data.password);

    const updatedUser = await this.userRepo.updatePassword(
      userId,
      hashedPassword,
    );
    if (!updatedUser) throw new NotFoundException('User update failed');
    return { success: true };
  }
  
}
