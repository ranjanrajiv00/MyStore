import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Admin',  icon: 'ti-panel', class: '' },
    { path: '/sign-in', title: 'Sign In',  icon: 'ti-settings', class: '' }
];

@Component({
    moduleId: module.id,
    selector: 'menu-items',
    templateUrl: 'menu-items.component.html',
})

export class MenuItemsComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
