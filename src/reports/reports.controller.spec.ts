import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsController } from './reports.controller';
import { Report } from './reports.entity';
import { ReportsService } from './reports.service';

describe('ReportsController', () => {
  let controller: ReportsController;
  let mockReportsService: Partial<ReportsService>;

  beforeEach(async () => {
    mockReportsService = {
      create: (createReportDto: CreateReportDto, user: User) => {
        return Promise.resolve({
          ...createReportDto,
          user,
        } as Report);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [
        {
          provide: ReportsService,
          useValue: mockReportsService,
        },
      ],
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
