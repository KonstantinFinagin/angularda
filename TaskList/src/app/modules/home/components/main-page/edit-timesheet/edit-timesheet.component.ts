import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Timesheet } from 'src/app/model/project/timesheet';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TimesheetService } from 'src/app/services/timesheet/timesheet.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NumberValidators } from 'src/app/helpers/number-validators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.scss']
})
export class EditTimesheetComponent implements OnInit, OnDestroy {

  maxTimeToLog: number;
  timesheet: Timesheet;
  loggedtime: FormControl;
  comment: FormControl;

  subscriptions: Subscription[] = [];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditTimesheetComponent>,
    private timesheetService: TimesheetService) {

    this.maxTimeToLog = this.calculateMaxTimeCanWrite(this.data.total, this.data.timesheet.loggedtime);

  }

  ngOnInit() {
    this.timesheet = {...this.data.timesheet};

    this.loggedtime = new FormControl(this.timesheet.loggedtime, [Validators.required, NumberValidators.range(0, this.maxTimeToLog)]);
    this.comment = new FormControl('', [Validators.maxLength(1000)]);

    this.form = this.fb.group({
      loggedtime: this.loggedtime,
      comment: this.comment
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions = [];
  }

  calculateMaxTimeCanWrite(total: number, logged: number): number {
    const result = 24 - total + logged;
    return result;
  }

  save() {

    this.subscriptions[0] = this.timesheetService.updateTimesheet(this.timesheet).subscribe(id => {
      this.timesheet.id = id;

      this.data.timesheet.id = id;
      this.data.timesheet.loggedtime = this.timesheet.loggedtime;
      this.data.timesheet.comment = this.timesheet.comment;
    });

    this.dialogRef.close(this.timesheet);
  }

  dismiss() {
    this.dialogRef.close();
  }
}
