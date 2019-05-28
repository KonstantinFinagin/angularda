import { Ticket } from './ticket';

export class Project {
    id: string;
    name: string;
    description: string;
    tickets: Ticket[];
}
