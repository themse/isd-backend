export interface InterestTableInterface {
  id: string;
  lead_id: string;
  message: string;

  created_at: number;
  updated_at: number;
}

export type UpsertInterestDto = {
  leadId: string;
  message: string;

  id: string | undefined; // update | create
};
