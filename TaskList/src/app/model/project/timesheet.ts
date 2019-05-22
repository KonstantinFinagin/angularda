import { Ticket } from './ticket';

export class Timesheet {
    _id: string;
    logged_time: number;
    date: Date;
    comment: string;
    ticket: Ticket;
}