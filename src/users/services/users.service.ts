import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { UserUpdateDTO } from '../dto/userUpdate.dto';
import { ErrorManager } from 'src/utils/error.manager';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(body: UserDTO): Promise<UsersEntity> {
    try {
      return await this.userRepository.save(body);
    } catch (error) {
      throw error;
    }
  }

  public async findUsers(): Promise<UsersEntity[]> {
    try {
      const users: UsersEntity[] = await this.userRepository.find();

      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found',
        });
      }

      return users;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }

  public async findUserById(id: string): Promise<UsersEntity> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User not found`,
        });
      }

      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .getOne();

      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No user found',
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User not found`,
        });
      }

      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Can't update user`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      if (!id) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `User not found`,
        });
      }

      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: `Can't delete user`,
        });
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new ErrorManager.createSignatureError(error.message);
      } else {
        throw error;
      }
    }
  }
}
