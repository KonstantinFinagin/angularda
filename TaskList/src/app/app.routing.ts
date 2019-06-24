import { MainPageComponent } from './modules/home/components/main-page/main-page.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './modules/shared/error/error.component';
import { AuthGuard } from './modules/authentication/guards/auth.guard';

const routes: Routes = [
    { path: 'mainpage', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', component: MainPageComponent, canActivate: [AuthGuard] },
    { path: '**', component: ErrorComponent },
];

export const routing = RouterModule.forRoot(routes);
