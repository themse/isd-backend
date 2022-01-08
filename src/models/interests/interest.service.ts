import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { InterestModel } from '@/models/interests/interest.model';
import { IBaseRepository } from '@/common/types/base-repository';
import { PutItem } from '@/services/dynamodb/types';
import { InterestCreateDto } from './types';
import { TYPES } from '@/common/di/types';
import { IInterestService } from './interest.service.interface';
import { ILeadService } from '../leads/lead.service.interface';

@injectable()
export class InterestService implements IInterestService {
  private readonly repository: IBaseRepository;
  private readonly leadService: ILeadService;

  constructor(
    @inject(TYPES.Repository) repository: IBaseRepository,
    @inject(TYPES.LeadService) leadService: ILeadService,
  ) {
    this.repository = repository;
    this.leadService = leadService;
  }

  async create(dto: InterestCreateDto) {
    const validatedData = InterestModel.validate(dto);

    const lead = await this.leadService.findOne({
      leadId: validatedData.leadId,
    });

    if (Object.keys(lead).length === 0) {
      return null; // TODO better throw error
    }

    const interestModel = new InterestModel(validatedData);
    const data = interestModel.getEntityMappings();

    const interestParam: PutItem = {
      TableName: InterestModel.tableName,
      Item: data,
    };

    await this.repository.create(interestParam);

    return { interestId: interestModel.id };
  }
}
