import { Routes } from '@angular/router';
import { CategoryComponent, CategoryDetailsComponent } from './index';

export const catalogRoutes: Routes = [
    {
        path: 'category',
        component: CategoryComponent
    },
    {
        path: 'category/:id',
        component: CategoryDetailsComponent
    }
]