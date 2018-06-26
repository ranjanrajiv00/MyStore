import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/index';
import { CatalogModule } from './catalog/index';
import { AdminComponent, TableComponent, UserComponent, DashboardComponent, AdminRoutes } from './index';

@NgModule({
    imports: [
        CatalogModule,
        CoreModule,
        RouterModule.forChild(AdminRoutes)
    ],
    declarations: [
        AdminComponent,
        DashboardComponent,
        UserComponent,
        TableComponent
    ],
    providers: [

    ]
})
export class AdminModule {

}