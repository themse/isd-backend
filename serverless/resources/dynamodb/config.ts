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
  interests_table:
    '${self:service}-interests-table-${opt:stage, self:provider.stage}',
};

export const tableThroughput = {
  throughput_list: {
    prod: 5,
    default: 1,
  },
  throughput:
    '${self:custom.dynamodb_variables.throughput.throughput_list.${self:custom.stage}, self:custom.dynamodb_variables.throughput.throughput_list.default}',
};
