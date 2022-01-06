export interface LeadTableInterface {
	id: string;
	email: string;
	phone: string;
	first_name: string;
	last_name: string;

	created_at: number;
	updated_at: number;
}

export type UpsertLeadDto = {
	email: string;
	phone: string;
	firstName: string;
	lastName: string;

	id: string | undefined; // update | create
};
