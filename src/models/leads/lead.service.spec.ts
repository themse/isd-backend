import { LeadCreateDto } from './types';
import { Container } from 'inversify';
import 'reflect-metadata';
import casual from 'casual';

import { InterestModel } from '../interests/interest.model';
import { ILeadService } from './lead.service.interface';
import { LeadService } from './lead.service';
import { IBaseRepository } from '../../common/types/base-repository';
import { TYPES } from '../../common/di/types';
import { LeadModel } from './lead.model';

const mockRepository: IBaseRepository = {
  create: jest.fn(),
  find: jest.fn(),
  query: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockLeadCreateDto: LeadCreateDto = {
  email: casual.email,
  phone: casual.phone,
  firstName: casual.first_name,
  lastName: casual.last_name,
};

const container = new Container();
let leadService: ILeadService;
let repository: IBaseRepository;

beforeAll(() => {
  container.bind<ILeadService>(TYPES.LeadService).to(LeadService);
  container
    .bind<IBaseRepository>(TYPES.Repository)
    .toConstantValue(mockRepository);

  leadService = container.get<ILeadService>(TYPES.LeadService);
  repository = container.get<IBaseRepository>(TYPES.Repository);
});

describe('LeadService', () => {
  it('create - check email or phone -> fail', async () => {
    repository.query = jest.fn().mockResolvedValue({ Count: 1 });
    expect(async () => leadService.create(mockLeadCreateDto)).rejects.toThrow(
      'email or phone is already registered',
    );
  });

  it('create - check repository.create invoke and final result', async () => {
    repository.query = jest.fn().mockResolvedValue({ Count: 0 });
    repository.create = jest.fn();

    const result = await leadService.create(mockLeadCreateDto);

    expect(repository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('leadId');
  });

  it('find - no lead exists + check repository.find input params', async () => {
    const leadParams = {
      TableName: LeadModel.tableName,
    };

    repository.find = jest.fn().mockResolvedValueOnce({ Count: 0 });
    const leadsData = await leadService.find();

    expect(repository.find).toHaveBeenCalledWith(leadParams);
    expect(leadsData).toEqual([]);
  });

  it('find - check repository.query input params', async () => {
    const mockLeadList = [{ id: casual.uuid }];

    const interestsParam = {
      TableName: InterestModel.tableName,
      IndexName: 'lead_index',
      KeyConditionExpression: 'lead_id = :v_lead_id',
      ExpressionAttributeValues: {
        ':v_lead_id': mockLeadList[0].id,
      },
      Limit: 15,
    };

    repository.find = jest
      .fn()
      .mockResolvedValueOnce({ Count: 1, Items: mockLeadList });
    repository.query = jest.fn();

    await leadService.find();

    expect(repository.query).toHaveBeenCalledWith(interestsParam);
  });

  it('find - returned value', async () => {
    const mockLeadId = casual.uuid;

    const mockLeadList = [
      { id: mockLeadId },
      { id: casual.uuid },
      { id: casual.uuid },
    ];

    const mockInterests = [
      { id: casual.uuid, leadId: mockLeadId },
      { id: casual.uuid, leadId: mockLeadId },
    ];

    const mockReturnedResult = [
      { ...mockLeadList[0], interests: mockInterests },
      ...mockLeadList.slice(1),
    ];

    repository.find = jest.fn().mockResolvedValueOnce({
      Count: mockLeadList.length,
      Items: mockLeadList,
    });

    repository.query = jest.fn().mockResolvedValueOnce({
      Items: mockInterests,
    });

    const result = await leadService.find();

    expect(result).toEqual(mockReturnedResult);
  });

  it('findOne - check input params', async () => {
    const mockLeadId = casual.uuid;
    const mockLeadParams = {
      TableName: LeadModel.tableName,
      Key: {
        id: mockLeadId,
      },
    };
    repository.findOne = jest.fn();

    await leadService.findOne({ leadId: mockLeadId });
    expect(repository.findOne).toHaveBeenCalledWith(mockLeadParams);
  });
});
