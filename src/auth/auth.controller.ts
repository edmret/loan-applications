import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { CredentialsDto } from '../dto/credentials.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
    description: 'Request a new token based on user credentials',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The login is success',
    type: CredentialsDto,
  })
  @ApiBody({
    type: LoginDto,
    description: 'The JSON body to create a new item',
  })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<CredentialsDto> {
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: 'Register',
    description: 'Register new user based on user credentials',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user was created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'bad data may the user already exists',
  })
  @ApiBody({
    type: RegisterDto,
    description: 'The JSON body to create register new user',
  })
  @Public()
  @Post('auth/register')
  async register(@Request() req): Promise<string> {
    await this.authService.register(req.body);
    return 'User was created successfully!';
  }
}
