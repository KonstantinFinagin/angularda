import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginComponent } from '../../authentication/components/login/login.component';
import { RegisterComponent } from '../../authentication/components/register/register.component';
import { User } from 'src/app/model/users/user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginModel } from 'src/app/model/login/loginmodel';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {


  user: User;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService
    ) {

    }

  ngOnInit() {
    this.subscriptions[0] = this.authenticationService.currentUser.subscribe(currentUser => {
      this.user = currentUser == null ? null : currentUser.user;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  openLoginDialog(): void {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px'
    });

    this.subscriptions[1] = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.login(result);
      }
    });
  }

  login(loginModel: LoginModel): void {

    this.subscriptions[3] = this.authenticationService
      .login(loginModel)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/mainpage']);
        },
        error => {
        }
      );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
