import type { AWS } from '@serverless/typescript';

import { leadsTable } from './tables/leads.table';
import { interestsTable } from './tables/interests.table';

export const DynamoDBResources: AWS['resources']['Resources'] = {
  LeadsTable: leadsTable,
  InterestsTable: interestsTable,
};
