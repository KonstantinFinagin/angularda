import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginModel } from 'src/app/model/login/loginmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;

  form: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>) {
      this.form = fb.group({
        email: this.email,
        password: this.password
      });
    }

  ngOnInit() {
    this.loginModel = new LoginModel();
  }

  login(): void {

    this.loginModel.email = this.form.value.email;
    this.loginModel.password = this.form.value.password;

    this.dialogRef.close(this.loginModel);
  }

  closeDialog(): void {
    this.dialogRef.close(null);
  }
}
