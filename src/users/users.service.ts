import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectPinoLogger(UsersService.name) private readonly logger: PinoLogger,
  ) {}

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });

    return this.userRepo.save(user);
  }

  findOne(id: number) {
    this.logger.info('Find one user with id %i', id);
    if (!id) return null;
    return this.userRepo.findOne(id);
  }

  find(email: string) {
    return this.userRepo.find({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepo.remove(user);
  }
}
