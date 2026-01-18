import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query } from '@nestjs/common';
import { CreateUserDto, createUserDtoValidator } from '../schema/create-user.schema';
import { UserServiceInterface } from '../interface/user.service.interface';
import { USER_SERVICE } from '../user.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/auth/decorators/role.decorator';
import { PaginationDto, paginationDtoValidator } from 'src/utils/pagination/schema/pagination.schema';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { UpdateUserDto, updateUserDtoValidator } from '../schema/update-user.schema';

@Controller({
  version: '1',
  path: 'user',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, VerifiedGuard, RolesGuard)
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: UserServiceInterface) { }

  @Post('/')
  async createUser(@Body(new VineValidationPipe(createUserDtoValidator)) createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Put('/:id')
  async updateUser(@Body(new VineValidationPipe(updateUserDtoValidator)) updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @Get('/')
  async getAllUsers(@Query(new VineValidationPipe(paginationDtoValidator)) query: PaginationDto) {
    return await this.userService.getAll(query);
  }
}
