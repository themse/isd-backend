import type { AWS } from '@serverless/typescript';

import { leadsTable } from './leads.table';
import { interestsTable } from './interests.table';

export const DynamoDBResources: AWS['resources']['Resources'] = {
  LeadsTable: leadsTable,
  InterestsTable: interestsTable,
};
