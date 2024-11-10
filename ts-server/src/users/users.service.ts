import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,

  ) { }

  async create(createUserInput: CreateUserInput) {
    return await this.usersRepository.save({ ...createUserInput })
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(username: string) {
    return await this.usersRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async update(id: string, user: UpdateUserInput) {
    return await this.usersRepository.update(id, user)
  }

  // async inviteUsers(userNames: string[],) {
  //   const users = userNames.map(async (username) => {
  //     await this.findOne(username)

  //   })
  // }
}
