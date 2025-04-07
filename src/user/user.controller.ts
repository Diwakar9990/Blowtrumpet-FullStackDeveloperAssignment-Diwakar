import { Controller, Get, Put, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/profile')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Req() req) {
        return this.usersService.findById(req.user.userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    updateProfile(@Req() req, @Body() body) {
        return this.usersService.updateProfile(req.user.userId, body);
    }
}