import { Routes } from '@angular/router'
import { AdminComponent, TableComponent, UserComponent, DashboardComponent } from './index';

export const AdminRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    }
];