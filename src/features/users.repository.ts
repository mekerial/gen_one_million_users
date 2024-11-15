import { InjectRepository } from '@nestjs/typeorm';
import { User } from './types/users.types';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}
  async getUsersWithProblems() {
    return await this.usersRepository.count({ where: { problems: true } });
  }
  async findBatchUsersWithProblems(batchSize: number) {
    return await this.usersRepository.find({
      where: { problems: true },
      take: batchSize,
    });
  }
  async updateUserProblemsFlag(users: User[]) {
    return this.usersRepository.update(
      { id: In(users.map((user) => user.id)) },
      { problems: false },
    );
  }

  async saveUsers(users: any[]) {
    return await this.usersRepository.save(users);
  }
}
