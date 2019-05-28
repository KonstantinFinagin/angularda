export interface PutTimesheetRequest {
    logged_time: number;
    date: string;
    ticket: string;
    comment: string;
}
