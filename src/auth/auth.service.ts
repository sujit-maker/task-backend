// src/auth/auth.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // Validate user credentials
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.prisma.users.findUnique({ where: { username } });
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  // Login function
  async login(loginDto: { username: string; password: string }) {
    const { username, password } = loginDto;

    // Validate the user
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { sub: user.id }; // Keep the payload minimal
    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
      userType: user.userType,  // Include userType in the response
    };
  }
}
