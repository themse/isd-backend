import { Container } from 'inversify';
import 'reflect-metadata';

import { IBaseRepository } from '../types/base-repository';
import { TYPES } from './types';
import { DynamoDBRepository } from '@/services/dynamodb/dynamodb-repository';
import { ILeadService } from '@/models/leads/lead.service.interface';
import { LeadService } from '@/models/leads/lead.service';
import { IInterestService } from '@/models/interests/interest.service.interface';
import { InterestService } from '@/models/interests/interest.service';

const container: Container = new Container();

container
  .bind<IBaseRepository>(TYPES.Repository)
  .to(DynamoDBRepository)
  .inSingletonScope();
container
  .bind<ILeadService>(TYPES.LeadService)
  .to(LeadService)
  .inSingletonScope();
container
  .bind<IInterestService>(TYPES.InterestService)
  .to(InterestService)
  .inSingletonScope();

export default container;
