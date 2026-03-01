import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../config/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async signup(email: string, password: string, name: string, organizationName: string) {
    const hash = await bcrypt.hash(password, 12);
    const org = await this.prisma.organization.create({ data: { name: organizationName } });
    const user = await this.prisma.user.create({
      data: { email, passwordHash: hash, name, organizationId: org.id, role: 'OWNER' },
    });
    return this.issueTokens(user.id, user.organizationId, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.issueTokens(user.id, user.organizationId, user.role);
  }

  issueTokens(userId: string, organizationId: string, role: string) {
    return {
      accessToken: this.jwtService.sign({ sub: userId, organizationId, role }),
      refreshToken: this.jwtService.sign({ sub: userId, organizationId, role, type: 'refresh' }),
    };
  }
}
