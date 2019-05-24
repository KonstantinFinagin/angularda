import { GetTicketTimesheetResponse } from './gettickettimesheetreponse';

export interface GetTimesheetResponse {
    _id: string;
    logged_time: number;
    date: string;
    comment: string;
    ticket: GetTicketTimesheetResponse;
}

