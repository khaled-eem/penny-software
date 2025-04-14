import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { last } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) {}

    
    async login(email: string, password: string) {

      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user || user.password !== password) {
        throw new UnauthorizedException('Invalid credentials');
      }
    
    
        const payload = { email };
        const token = this.jwtService.sign(payload);
        return { message: 'Login successful',
             token: token ,
             expires_in: 28800,
            
      }
    
  }



  async signup (data:{firstName: string; lastName: string; email: string; password: string }){
    const { firstName, lastName, email, password } = data;
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

    const user=await this.prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password, 
          },
    });
    return{
        message: 'Signup successful'
    }


  }


  async getUser(){
    return this.prisma.user.findMany({
      select:{
        firstName:true,
        lastName:true,
        email:true,
        password:true,
      }

    })
  }
}
