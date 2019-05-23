import { Ticket } from './ticket';

export class Project {
    _id: string;
    name: string;
    description: string;
    tickets: Ticket[];
}
