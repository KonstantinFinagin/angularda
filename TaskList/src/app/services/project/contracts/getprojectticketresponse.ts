export interface GetProjectTicketResponse {
    _id: string;
    name: string;
    description: string;
    estimate: number;
    start_date: string;
    end_date: string;
    status: number;
    responsible: string;
    type: number;
    project: string;
    reporter: string;
}
