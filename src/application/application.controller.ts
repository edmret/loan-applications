import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../constants/role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApplicationService } from './application.service';
import { CreateLoanApplicationDto, LoanApplicationDto } from '../dto/loan.dto';

@ApiTags('Application')
@ApiBearerAuth('access-token') // Make sure this matches the key name given in the DocumentBuilder
@Controller()
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @ApiOperation({
    summary: 'Create application',
    description: 'Create new loan application',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The application has created',
    type: LoanApplicationDto,
  })
  @ApiBody({
    type: CreateLoanApplicationDto,
    description: 'The loan application for getting a loan',
  })
  @Post('applications')
  createApplication(@Request() req) {
    return this.applicationService.create(req.body, req.user.userId);
  }

  @ApiOperation({
    summary: 'Get specific application',
    description: 'Gets the given application requested By Id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The application',
    type: LoanApplicationDto,
  })
  @ApiParam({
    type: String,
    name: 'id',
    required: true,
    description: 'the identifier of the application',
  })
  @Get('applications/:id')
  getApplication(@Param('id') id: string): any {
    return this.applicationService.findById(id);
  }

  @ApiOperation({
    summary: 'Get All the applications',
    description: 'Get all the applications in the system',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of applications in the system',
    type: LoanApplicationDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'you are not allowed to see the applications',
  })
  @Get('applications')
  @Roles(Role.Admin)
  getAllApplications(): any {
    return this.applicationService.findAll();
  }
}
