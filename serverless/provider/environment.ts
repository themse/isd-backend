// provider.environment

export default {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',

  LEADS_TABLE: '${self:custom.dynamodb_variables.tables.leads_table}',
  INTERESTS_TABLE: '${self:custom.dynamodb_variables.tables.interests_table}',

  STAGE: '${self:custom.stage}',
  DYNAMODB_LOCAL_STAGE:
    '${self:custom.dynamodb_variables.dynamodb_local_stage}',
  DYNAMODB_LOCAL_ENDPOINT:
    '${self:custom.dynamodb_variables.dynamodb_local_endpoint}',
  DYNAMODB_LOCAL_REGION:
    '${self:custom.dynamodb_variables.dynamodb_local_region}',
};
