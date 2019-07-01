export interface PutTimesheetRequest {
    _id: string;
    logged_time: number;
    date: string;
    ticket: string;
    comment: string;
}
