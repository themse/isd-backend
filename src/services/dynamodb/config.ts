export const dynamoDBConfig = {
	stages: ['dev'],
	start: {
		port: 8008,
		inMemory: true,
		heapInitial: '200m',
		heapMax: '1g',
		migrate: true,
		seed: true,
		convertEmptyValues: true,
		//  Uncomment only if you already have a DynamoDB running locally
		// noStart: true,
	},
};

export const tableNames = {
	leads_table: '${self:service}-leads-table-${opt:stage, self:provider.stage}',
	interests_table: '${self:service}-interests-table-${opt:stage, self:provider.stage}',
};

export const tableThroughput = {
	table_throughput_list: {
		prod: 5,
		default: 1,
	},
	table_throughput:
		'${self:custom.table_throughput_list.${self:custom.stage}, self:custom.table_throughput_list.default}',
};
