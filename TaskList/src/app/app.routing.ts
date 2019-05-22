import { MainPageComponent } from './components/main-page/main-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'mainpage', component: MainPageComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: 'mainpage', pathMatch: 'full' },
    { path: '**', redirectTo: 'mainpage', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(routes);
