import { Component, OnInit, OnDestroy, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ROUTES } from '../index';
import { AuthenticationService } from '../../../core/index';

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit, OnDestroy {
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;
    private body: any;
    private sidebar: any;
    @ViewChild("navbar-cmp") button;

    constructor(location: Location,
        private renderer: Renderer,
        private element: ElementRef,
        private authService: AuthenticationService) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.body = document.getElementsByTagName('body')[0];
        this.sidebar = document.getElementsByClassName('sidebar')[0];
    }

    getTitle() {
        var pathElements = window.location.pathname.split('/');
        var title = pathElements[2];

        for (var item = 0; item < this.listTitles.length; item++) {
            if (this.listTitles[item].path === title) {
                return this.listTitles[item].title;
            }
        }
        return "Dashboard";
    }

    sidebarToggle() {

        if (this.sidebarVisible == false) {
            this.openSideBar();
        } else {
            this.closeSideBar();
        }
    }

    openSideBar() {
        var toggleButton=this.toggleButton;
        
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        this.body.classList.add('nav-open');
        this.sidebarVisible = true;
        this.sidebar.classList.add('width-auto');
    }

    closeSideBar() {
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        this.body.classList.remove('nav-open');
        this.sidebar.classList.remove('width-auto');
    }

    logout() {
        this.authService.signOut();
    }

    ngOnDestroy() {
        this.body.classList.remove('nav-open');
    }
}
