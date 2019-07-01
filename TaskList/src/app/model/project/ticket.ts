import { Timesheet } from './timesheet';

export class Ticket {
    id: string;
    name: string;
    description: string;
    estimate: number;
    startdate: Date;
    enddate: Date;
    status: number;
    responsible: string;
    type: number;
    project: string;
    reporter: string;
    timesheets: Timesheet[];
}
