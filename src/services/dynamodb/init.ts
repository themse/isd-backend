import * as AWS from 'aws-sdk';

export const initDb = () => {
  let options: {} = { region: 'eu-central-1' };

  // TODO check if STAGE === 'dev'
  if (true) {
    options = {
      region: 'localhost', // TODO move to env
      endpoint: 'http://localhost:8008',
    };
  }

  AWS.config.update(options);
};
