export interface PutTicketResponse {
    _id: string;
    name: string;
    description: string;
    estimate: number;
    start_date: string;
    end_date: string;
    status: number;
    responsbile: any;
    type: number;
    project: any;
    reporter: any;
}
