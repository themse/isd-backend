import { Container } from 'inversify';
import 'reflect-metadata';
import casual from 'casual';

import { InterestService } from '../interests/interest.service';
import { IInterestService } from './interest.service.interface';
import { InterestCreateDto } from './types';
import { IBaseRepository } from '../../common/types/base-repository';
import { ILeadService } from '../leads/lead.service.interface';
import { TYPES } from '../../common/di/types';

const mockRepository: IBaseRepository = {
  create: jest.fn(),
  find: jest.fn(),
  query: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};
const mockLeadService: ILeadService = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
};

const mockLeadId = casual.uuid;
const mockInterestCreateDto: InterestCreateDto = {
  leadId: mockLeadId,
  message: casual.sentence,
};

const container = new Container();
let leadService: ILeadService;
let interestService: IInterestService;
let repository: IBaseRepository;

beforeAll(() => {
  container.bind<IInterestService>(TYPES.InterestService).to(InterestService);
  container
    .bind<ILeadService>(TYPES.LeadService)
    .toConstantValue(mockLeadService);
  container
    .bind<IBaseRepository>(TYPES.Repository)
    .toConstantValue(mockRepository);

  leadService = container.get<ILeadService>(TYPES.LeadService);
  interestService = container.get<IInterestService>(TYPES.InterestService);
  repository = container.get<IBaseRepository>(TYPES.Repository);
});

describe('InterestService', () => {
  it('create - check leadService.findOne input params + final result if no lead is found', async () => {
    leadService.findOne = jest.fn().mockResolvedValue({});
    const result = await interestService.create(mockInterestCreateDto);

    expect(leadService.findOne).toHaveBeenCalledWith({ leadId: mockLeadId });
    expect(result).toBeNull();
  });

  it('create - final returned value', async () => {
    leadService.findOne = jest.fn().mockResolvedValue({ id: mockLeadId });
    repository.create = jest.fn();

    const result = await interestService.create(mockInterestCreateDto);

    expect(repository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('interestId');
  });
});
