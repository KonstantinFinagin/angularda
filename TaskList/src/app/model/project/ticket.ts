import { Timesheet } from './timesheet';

export class Ticket {
    id: string;
    name: string;
    project: string;
    status: number;
    timesheets: Timesheet[];
}
