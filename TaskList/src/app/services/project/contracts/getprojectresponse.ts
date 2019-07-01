import { GetProjectTicketResponse } from './getprojectticketresponse';

export interface GetProjectResponse {
    _id: string;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    customer_name: string;
    image_url: string;
    tickets: GetProjectTicketResponse[];
}
