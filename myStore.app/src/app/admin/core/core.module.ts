import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/index';
import { FooterComponent, NavbarComponent, SidebarComponent } from './index';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        SharedModule
    ]
})

export class CoreModule { }