import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}

  async updateProblemsFlag() {
    const batchSize = 10000;
    let totalUpdatedCount = 0;

    let usersWithProblemsCount =
      await this.usersRepository.getUsersWithProblems();

    while (usersWithProblemsCount > 0) {
      const users =
        await this.usersRepository.findBatchUsersWithProblems(batchSize);

      await this.usersRepository.updateUserProblemsFlag(users);

      totalUpdatedCount += users.length;
      usersWithProblemsCount -= users.length;
    }

    return totalUpdatedCount;
  }

  async generateUsers() {
    const totalUsers = 1000000;
    const batchSize = 10000;
    const genders = ['male', 'female'];

    for (let i = 0; i < totalUsers / batchSize; i++) {
      const users = [];
      for (let j = 0; j < batchSize; j++) {
        const index = i * batchSize + j;
        users.push({
          firstName: `Имя${index}`,
          lastName: `Фамилия${index}`,
          age: Math.floor(Math.random() * 80) + 18,
          gender: genders[Math.floor(Math.random() * genders.length)],
          problems: Math.random() > 0.5,
        });
      }

      await this.usersRepository.saveUsers(users);
    }

    return totalUsers;
  }
}
