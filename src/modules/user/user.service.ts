import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findById(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findOne(query: Partial<Pick<User, 'username' | 'id'>>) {
    return this.userRepository.findOne({
      where: query
    })
  }

  findAll(options: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }


}
