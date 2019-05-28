import { Component, OnInit, Inject } from '@angular/core';
import { Timesheet } from 'src/app/model/project/timesheet';
import { FormControl, Validators } from '@angular/forms';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NumberValidators } from 'src/app/helpers/number-validators';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit {

  maxTimeToLog: number;
  timesheet: Timesheet;
  loggedtime: FormControl;
  comment: FormControl;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTimesheetComponent>,
    private timesheetService: TimesheetService) {

    this.maxTimeToLog = this.calculateMaxTimeCanWrite(this.data.total);
    this.loggedtime = new FormControl('', [Validators.required, NumberValidators.range(0, this.maxTimeToLog)]);
    this.comment = new FormControl('', [Validators.maxLength(1000)]);
  }

  ngOnInit() {
    this.timesheet = this.data.timesheet;
  }

  calculateMaxTimeCanWrite(total: number): number {
    return 24 - total;
  }

  save() {
    console.log(this.timesheet);
    this.timesheetService.updateTimesheet(this.timesheet);
    this.dialogRef.close(this.timesheet);
  }

  dismiss() {
    this.dialogRef.close();
  }
}
