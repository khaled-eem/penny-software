
import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { get } from 'http';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }


  @Post('create/user')
  async createUser(@Body() body: { firstName: string; lastName: string; email: string; password: string }){
    return this.authService.signup(body)
  }

  @Get('users')
  async getUser(){
    return this.authService.getUser();
  }
}



/** 
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {


  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
}
*/