export interface GetTicketTimesheetResponse {
    _id: string;
    name: string;
    estimate: number;
    start_date: Date;
    end_date: Date;
    project: string;
}
