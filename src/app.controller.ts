import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { CredentialsDto } from './dto/credentials.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

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

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('hi')
  @Roles(Role.Admin)
  getHello(): string {
    return this.appService.getHello();
  }
}
