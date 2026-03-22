import { Controller, Post, Body, Inject, Delete, Param, Get, Put, UseGuards, Query, Patch, Res } from '@nestjs/common';
import { CreateUserDto, createUserDtoValidator } from '../schema/create-user.schema';
import { UserServiceInterface } from '../interface/user.service.interface';
import { USER_SERVICE } from '../user.constants';
import { VineValidationPipe } from 'src/utils/validator/pipe/vine_validation.pipe';
import { Role } from 'src/auth/decorators/role.decorator';
import { Verified } from 'src/auth/decorators/verified.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { VerifiedGuard } from 'src/auth/guards/verified.guard';
import { UpdateUserDto, updateUserDtoValidator } from '../schema/update-user.schema';
import { ToggleUserBlockDto, toggleUserBlockDtoValidator } from '../schema/toggle-user-block.schema';
import { AccessTokenGuard } from 'src/auth/guards/access_token.guard';
import { BlockedGuard } from 'src/auth/guards/blocked.guard';
import { FastifyReply } from 'fastify';
import { UserFilterDto, userFilterDtoValidator } from '../schema/user-filter.schema';

@Controller({
  version: '1',
  path: 'user',
})
@Verified()
@Role("ADMIN")
@UseGuards(AccessTokenGuard, BlockedGuard, VerifiedGuard, RolesGuard)
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
  async getAllUsers(@Query(new VineValidationPipe(userFilterDtoValidator)) query: UserFilterDto) {
    return await this.userService.getAll(query);
  }

  @Patch('/toggle-block/:id')
  async toggleUserBlock(@Param('id') id: string, @Body(new VineValidationPipe(toggleUserBlockDtoValidator)) dto: ToggleUserBlockDto) {
    return await this.userService.toggleUserBlock(id, dto);
  }

  @Patch('/verify/:id')
  async verifyUser(@Param('id') id: string) {
    return await this.userService.verifyUser(id);
  }

  @Get('/export')
  async export(@Query(new VineValidationPipe(userFilterDtoValidator)) query: UserFilterDto, @Res() reply: FastifyReply) {
    const stream = await this.userService.exportUsers(query)

    reply.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )

    reply.header(
      'Content-Disposition',
      'attachment; filename="users.xlsx"',
    )

    return reply.send(stream)
  }
}
