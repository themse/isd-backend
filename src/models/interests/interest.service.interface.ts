import { InterestCreateDto } from './types';

export interface IInterestService {
  create(dto: InterestCreateDto): Promise<{ interestId: string } | null>;
}
