import { InferType } from 'yup';

import { LeadModel } from '@/models/leads/lead.model';
import { InterestModel } from '@/models/interests/interest.model';
import { interestSchema } from '@/models/interests/interest.schema';
import { IBaseRepository } from '@/common/types/base-repository';
import { GetItem, PutItem } from '@/services/dynamodb/types';

export class InterestService {
	private readonly repository: IBaseRepository;

	constructor(repository: IBaseRepository) {
		this.repository = repository;
	}

	async create(dto: InferType<typeof interestSchema>) {
		const validatedData = InterestModel.validate(dto);

		const leadParam: GetItem = {
			TableName: LeadModel.tableName,
			Key: {
				id: validatedData.leadId,
			},
		};

		const lead = await this.repository.findOne(leadParam);

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
