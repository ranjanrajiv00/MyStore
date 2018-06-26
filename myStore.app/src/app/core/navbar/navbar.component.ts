import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
    private toggleButton: any;
    private sidebarVisible: boolean;
    private body: any;
    private sidebar: any;

    constructor(public location: Location, private element: ElementRef) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.body = document.getElementsByTagName('body')[0];
        this.sidebar = document.getElementsByClassName('sidebar')[0];
    }

    sidebarToggle() {
        if (this.sidebarVisible == false) {
            this.openSidebar();
        } else {
            this.closeSideBar();
        }
    }

    openSidebar() {
        var toggleButton=this.toggleButton;
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        this.body.classList.add('nav-open');
        this.sidebarVisible = true;
        this.sidebar.classList.add('width-auto');
        this.sidebar.classList.remove('display-none');
    }

    closeSideBar() {
        var toggleButton=this.toggleButton;
        
        toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        this.body.classList.remove('nav-open');
        this.sidebar.classList.remove('width-auto');
        this.sidebar.classList.add('display-none');
    }

    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('nav-open');
    }
}
