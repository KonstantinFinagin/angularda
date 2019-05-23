import { Timesheet } from './timesheet';

export class Ticket {
    _id: string;
    name: string;
    project: string;
    status: number;
    timesheets: Timesheet[];
}
