import { Routes } from '@angular/router';

import { HomeComponent } from './index';
import { LayoutComponent, AuthGuard, SignInComponent } from './core/index';
import { AdminComponent } from './admin/index';

export const AppRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'sign-in',
                component: SignInComponent,
            }
        ]
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        loadChildren: './admin/admin.module#AdminModule'
    }
]
