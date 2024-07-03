import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { Report } from './reports.entity';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private readonly repo: Repository<Report>,
  ) {}

  createEstimate(estimateDto: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make')
      .andWhere('model = :model')
      .andWhere('lng - :lng BETWEEN -5 AND 5')
      .andWhere('lat - :lat BETWEEN -5 AND 5')
      .andWhere('year - :year BETWEEN -5 AND 5')
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ ...estimateDto })
      .limit(3)
      .getRawOne();
  }

  create(reportDto: CreateReportDto, user: User) {
    const report = this.repo.create(reportDto);
    report.user = user;

    return this.repo.save(report);
  }

  async changeApproval(id: number, { approved }: ApproveReportDto) {
    const report = await this.repo.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException('report not found');
    });

    report.approved = approved;
    return this.repo.save(report);
  }
}
