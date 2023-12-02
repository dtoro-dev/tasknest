import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UserDTO } from '../dto/user.dto';
import { UserUpdateDTO } from '../dto/userUpdate.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async registerUser(@Body() body: UserDTO) {
    const user = await this.usersService.createUser(body);
    return user;
  }

  @Get('all')
  public async getAllUsers() {
    const users = await this.usersService.findUsers();
    return users;
  }

  @Get(':id')
  public async findUserById(@Param('id') id: string) {
    const user = await this.usersService.findUserById(id);
    return user;
  }

  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDTO,
  ) {
    const user = await this.usersService.updateUser(id, body);
    return user;
  }

  @Delete('delete/:id')
  public async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.deleteUser(id);
    return user;
  }
}
