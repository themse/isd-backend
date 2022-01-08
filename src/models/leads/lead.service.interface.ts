import { GetItemOutput } from '@/services/dynamodb/types';
import { InterestEntity } from './../interests/types';
import { LeadCreateDto, LeadEntity } from './types';

export interface ILeadService {
  create(dto: LeadCreateDto): Promise<{ leadId: string } | never>;

  find(): Promise<
    Array<LeadEntity & { interests: InterestEntity[] }> | unknown[]
  >;

  findOne({ leadId: string }): Promise<GetItemOutput>;
}
