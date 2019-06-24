import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoginComponent } from '../components/login/login.component';
import { LoginModel } from 'src/app/model/login/loginmodel';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      return true;
    } else {
      this.openLoginDialog();
    }

    this.router.navigate(['']);
    return false;
  }

  openLoginDialog(): void {

    const dialogRef = this.dialog.open(LoginComponent, {
      width: '450px'
    });

    this.subscriptions[0] = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.login(result);
      }
    });
  }

  login(loginModel: LoginModel): void {

    this.subscriptions[1] = this.authenticationService
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
}
