import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

class SignupDto {
  email!: string;
  password!: string;
  name!: string;
  organizationName!: string;
}

class LoginDto {
  email!: string;
  password!: string;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.email, body.password, body.name, body.organizationName);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('google')
  googleAuth() {
    return { status: 'stub', message: 'Google OAuth strategy can be added here.' };
  }

  @Post('forgot-password')
  forgotPassword() {
    return { status: 'stub', message: 'Password reset email queued.' };
  }
}
