export interface GetProjectTicketResponse {
    _id: string;
    name: string;
    description: string;
    estimate: number;
    start_date: Date;
    end_date: Date;
    status: number;
    responsible: string;
    type: number;
    project: string;
    reporter: string;
}
