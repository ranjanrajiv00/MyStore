import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared/index';
import { CategoryComponent, CategoryDetailsComponent, CategoryService, catalogRoutes } from './index';

@NgModule({
    imports:[
        SharedModule,
        RouterModule,
        RouterModule.forChild(catalogRoutes)
    ],
    declarations:[
        CategoryComponent,
        CategoryDetailsComponent
    ],
    providers:[
        CategoryService
    ]
})
export class CatalogModule
{
    
}