export const dynamoDbConfig = {
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
