import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/model/project/ticket';
import { Project } from 'src/app/model/project/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketStatus } from 'src/app/model/project/ticketstatusenum';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tickets: Ticket[];

  projects: Observable<Project[]>;
  currentProject: Project;

  statusTickets: { [key: string]: Ticket[] };
  ticketStatuses: string[] = [];
  elementName = 'ddlist';

  constructor(
    private ticketService: TicketService,
    private projectService: ProjectService) {
    }

  ngOnInit() {
    this.statusTickets = {};

    this.loadProjects();
  }

  loadProjects() {
    this.projects = this.projectService.loadAll();
  }

  initializeTickets(project: Project) {

    this.ticketStatuses = [];
    for (const s in TicketStatus) {

      if (typeof(TicketStatus[s]) === 'number') {

        const ticketStatusNum = parseInt(TicketStatus[s], 10);
        const ticketStatusString = s;

        const tickets = project.tickets.filter(ticket => ticket.status === ticketStatusNum);

        this.ticketStatuses.push(ticketStatusString);
        this.statusTickets[ticketStatusString] = tickets;
      }
    }

    console.log(this.statusTickets);
  }

  projectChanged(project: Project) {
    this.initializeTickets(project);
  }

  getStatusTicketsLength() {
    return Object.keys(this.statusTickets).length;
  }

  getIndexValue = (i: number): number[] => {

    if (i === TicketStatus.Open) { return [TicketStatus.Development]; }
    if (i === TicketStatus.Development) { return [TicketStatus.Open, TicketStatus.ReadyForQA]; }
    if (i === TicketStatus.ReadyForQA) { return [TicketStatus.Development, TicketStatus.Test]; }
    if (i === TicketStatus.Test) { return [TicketStatus.Closed, TicketStatus.Development]; }
    if (i === TicketStatus.Closed) { return [TicketStatus.Open, TicketStatus.Test]; }
  }

  getConnectedTo(i: number) {
    return this.getIndexValue(i).map(value => this.elementName + value);
  }

  getConnectedToByName(name: string) {
    console.log(name);
    const index = parseInt(name.substring(this.elementName.length), 10);
    return this.getConnectedTo(index);
  }

  drop(event: CdkDragDrop<Ticket[]>, index: number) {

    const connected = this.getConnectedToByName(event.previousContainer.id);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (connected.indexOf(event.container.id) === -1) {
        // do nothing
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
