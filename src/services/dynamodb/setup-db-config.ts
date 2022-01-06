import * as AWS from 'aws-sdk';

export const setupDbConfig = () => {
  let options: {} = { region: 'eu-central-1' };

  if (process.env.STAGE === process.env.DYNAMODB_LOCAL_STAGE) {
    options = {
      region: process.env.DYNAMODB_LOCAL_REGION,
      endpoint: process.env.DYNAMODB_LOCAL_ENDPOINT,
    };
  }

  AWS.config.update(options);
};
