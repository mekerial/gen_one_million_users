import { Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected usersService: UsersService) {}

  @Post('reset-problems')
  async resetProblemsFlag() {
    const count = await this.usersService.updateProblemsFlag();
    return {
      message: `Was problems: ${count}`,
    };
  }

  @Post('generate')
  async generateUsers() {
    await this.usersService.generateUsers();
    return;
  }
}
