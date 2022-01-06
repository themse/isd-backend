import { InferType } from 'yup';

import { InterestModel } from '@/models/interests/interest.model';
import {
  ScanItemOutput,
  QueryItemOutput,
  PutItem,
  ScanItem,
  QueryItem,
} from '@/services/dynamodb/types';
import { leadSchema } from '@/models/leads/lead.schema';
import { LeadModel } from '@/models/leads/lead.model';
import { IBaseRepository } from '@/common/types/base-repository';

export class LeadService {
  private readonly repository: IBaseRepository;

  constructor(repository: IBaseRepository) {
    this.repository = repository;
  }

  async create(dto: InferType<typeof leadSchema>) {
    const validatedData = LeadModel.validate(dto);
    const leadModel = new LeadModel(validatedData);

    const data = leadModel.getEntityMappings();
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
      leadParams
    )) as ScanItemOutput;

    if (leadsData.Count === 0) {
      return [];
    }

    let result = {};

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
        interestsParam
      )) as QueryItemOutput;
      result[leadItem.id] = {
        ...leadItem,
        interests: interestsData?.Items,
      };
    }

    return Object.values(result);
  }
}
