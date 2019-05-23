import { GetTicketTimesheetResponse } from './gettickettimesheetreponse';

export interface GetTimesheetResponse {
    _id: string;
    loggedtime: number;
    date: Date;
    comment: Comment;
    ticket: GetTicketTimesheetResponse[];
}

