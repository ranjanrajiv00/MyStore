import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminModule } from './admin/index'
import { CoreModule } from './core/index';
import { SharedModule } from './shared/index';
import { AppComponent, HomeComponent, AppRoutes } from './index';

@NgModule({
  declarations: [
    HomeComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
