export interface PostTicketRequest {
    name: string;
    description: string;
    estimate: number;
    start_date: string;
    end_date: string;
    status: number;
    responsible: any;
    type: number;
    project: any;
    reporter: any;
}
