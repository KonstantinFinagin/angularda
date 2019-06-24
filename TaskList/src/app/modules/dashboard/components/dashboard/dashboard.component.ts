import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/ticket/ticket.service';
import { Ticket } from 'src/app/model/project/ticket';
import { Project } from 'src/app/model/project/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TicketStatus } from 'src/app/model/project/ticketstatusenum';
import { ProjectService } from 'src/app/services/project/project.service';
import { Observable, Subscription } from 'rxjs';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tickets: Ticket[];

  projects: Observable<Project[]>;
  currentProject: Project;

  statusTickets: { [key: string]: Ticket[] } = {};
  ticketStatuses: string[] = [];
  highlightedColumns: boolean[];

  subscriptions: Subscription[] = [];

  elementName = 'ddlist';

  constructor(
    private ticketService: TicketService,
    private projectService: ProjectService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projects = this.projectService.loadAll();
    return this.projects;
  }

  initializeTickets(project: Project) {

    this.ticketStatuses = [];
    for (const s in TicketStatus) {

      if (typeof (TicketStatus[s]) === 'number') {

        const ticketStatusNum = parseInt(TicketStatus[s], 10);
        const ticketStatusString = s;

        const tickets = project.tickets.filter(ticket => ticket.status === ticketStatusNum);

        this.ticketStatuses.push(ticketStatusString);
        this.statusTickets[ticketStatusString] = tickets;
      }
    }

    this.highlightedColumns = this.ticketStatuses.map(() => false);
  }

  projectChanged(project: Project) {
    this.initializeTickets(project);
  }

  getStatusTicketsLength() {
    return Object.keys(this.statusTickets).length;
  }

  getConnectedIndexes = (i: number): number[] => {

    switch (i) {
      case TicketStatus.Open: return [TicketStatus.Development];
      case TicketStatus.Development: return [TicketStatus.Open, TicketStatus.ReadyForQA];
      case TicketStatus.ReadyForQA: return [TicketStatus.Development, TicketStatus.Test];
      case TicketStatus.Test: return [TicketStatus.Closed, TicketStatus.Development];
      case TicketStatus.Closed: return [TicketStatus.Open, TicketStatus.Test];
    }
  }

  getConnectedTo(i: number) {
    return this.getConnectedIndexes(i).map(value => this.elementName + value);
  }

  getIndexByName(name: string) {
    return parseInt(name.substring(this.elementName.length), 10);
  }

  getConnectedToByName(name: string) {
    const index = this.getIndexByName(name);
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

      const ticket = event.item.data as Ticket;
      ticket.status = this.getIndexByName(event.container.id);
      this.subscriptions[0] = this.ticketService.updateTicketStatus(ticket).subscribe(data => { });
    }
  }

  ticketDragStarted(statusIndex: number) {
    const connectedIndexes = this.getConnectedIndexes(statusIndex);
    this.highlightedColumns = this.ticketStatuses.map((value, index) => connectedIndexes.indexOf(index + 1) !== -1);
  }
  ticketDragEnded() {
    this.highlightedColumns = this.ticketStatuses.map(() => false);
  }

  openNewTicketDialog() {

    const dialogRef = this.dialog.open(NewTicketComponent, {
      width: '450px',
      data: {
        project: this.currentProject,
      }
    });

    this.subscriptions[1] = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.subscriptions[2] = this.loadProjects().subscribe(projects => {
          this.currentProject = projects.find(p => p.id === result.project);
          this.initializeTickets(this.currentProject);
        });
      }
    });
  }

  customCompare(o1, o2) {
    return o1.id === o2.id;
  }
}
