import { inject, injectable } from 'inversify';
import 'reflect-metadata';

import { InterestModel } from '@/models/interests/interest.model';
import {
  ScanItemOutput,
  QueryItemOutput,
  PutItem,
  ScanItem,
  QueryItem,
  GetItem,
} from '@/services/dynamodb/types';
import { LeadModel } from '@/models/leads/lead.model';
import { IBaseRepository } from '@/common/types/base-repository';
import { TYPES } from '@/common/di/types';
import { LeadCreateDto } from './types';
import { ILeadService } from './lead.service.interface';

@injectable()
export class LeadService implements ILeadService {
  private readonly repository: IBaseRepository;

  constructor(@inject(TYPES.Repository) repository: IBaseRepository) {
    this.repository = repository;
  }

  async create(dto: LeadCreateDto) {
    const validatedData = LeadModel.validate(dto);
    const leadModel = new LeadModel(validatedData);

    const data = leadModel.getEntityMappings();

    const checkExist = await Promise.all([
      this.isEmailExist(data.email),
      this.isPhoneExist(data.phone),
    ]);

    if (checkExist.includes(true)) {
      throw new Error('email or phone is already registered');
    }

    const params: PutItem = {
      TableName: LeadModel.tableName,
      Item: data,
    };

    await this.repository.create(params);

    return {
      leadId: leadModel.id,
    };
  }

  async find() {
    const leadParams: ScanItem = {
      TableName: LeadModel.tableName,
    };
    const leadsData = (await this.repository.find(
      leadParams,
    )) as ScanItemOutput;

    if (leadsData.Count === 0) {
      return [];
    }

    const result = {};

    for (const leadItem of leadsData.Items) {
      const interestsParam: QueryItem = {
        TableName: InterestModel.tableName,
        IndexName: 'lead_index',
        KeyConditionExpression: 'lead_id = :v_lead_id',
        ExpressionAttributeValues: {
          ':v_lead_id': leadItem.id,
        },
        Limit: 15,
      };

      const interestsData = (await this.repository.query(
        interestsParam,
      )) as QueryItemOutput;
      result[leadItem.id] = {
        ...leadItem,
        interests: interestsData?.Items,
      };
    }

    return Object.values(result);
  }

  async findOne(params: { leadId: string }) {
    const leadParam: GetItem = {
      TableName: LeadModel.tableName,
      Key: {
        id: params.leadId,
      },
    };

    return this.repository.findOne(leadParam);
  }

  protected async isEmailExist(email: string) {
    const params: QueryItem = {
      TableName: LeadModel.tableName,
      IndexName: 'lead_email_index',
      KeyConditionExpression: 'email = :v_email',
      ExpressionAttributeValues: {
        ':v_email': email,
      },
      ProjectionExpression: 'id',
      Limit: 1,
    };

    const result = (await this.repository.query(params)) as QueryItemOutput;

    return result.Count > 0;
  }

  protected async isPhoneExist(phone: string) {
    const params: QueryItem = {
      TableName: LeadModel.tableName,
      IndexName: 'lead_phone_index',
      KeyConditionExpression: 'phone = :v_phone',
      ExpressionAttributeValues: {
        ':v_phone': phone,
      },
      ProjectionExpression: 'id',
      Limit: 1,
    };

    const result = (await this.repository.query(params)) as QueryItemOutput;

    return result.Count > 0;
  }
}
