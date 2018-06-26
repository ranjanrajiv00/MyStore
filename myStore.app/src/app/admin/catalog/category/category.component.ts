import { Component, OnInit } from '@angular/core';

import { CategoryService, Category } from '../index';
import { ToasterService } from '../../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
    categories: Category[] = null;
    constructor(private categoryService: CategoryService, private toasterService: ToasterService) {

    }

    ngOnInit(): void {
        this.get();
        throw Error("43434343434343");
    }

    get(){
        this.categoryService.get<Category[]>().subscribe(data => {
            this.categories = data;
        });
    }
    delete(id: string): void {
        this.categoryService.delete(id).subscribe(result => {
            this.toasterService.success('Category has been deleted.');
            this.get();
        });
    }
}