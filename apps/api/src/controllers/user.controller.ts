import { Patch, UsePipes, Body, Param, Controller, } from '@nestjs/common';
import type { ChangePasswordDTO } from 'src/common/validators/change-password.schema';
import { ChangePasswordSchema } from 'src/common/validators/change-password.schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { UsersService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UsersService) {}
  @Patch('change-password')
  @UsePipes(new ZodValidationPipe(ChangePasswordSchema))
  async ChangePassword(@Param('id') userID: string, @Body() data : ChangePasswordDTO) {
    return await this.userservice.changePassword(userID, data)
    
  }
}
