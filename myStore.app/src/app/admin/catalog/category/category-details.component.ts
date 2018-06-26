import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { CategoryService, Category } from '../index';
import { HelperService, UploadFileService, ToasterService } from '../../../shared/index';
import { Constants } from '../../../core/index';

@Component({
    templateUrl: './category-details.component.html'
})
export class CategoryDetailsComponent implements OnInit {
    categoryForm: FormGroup;
    category: Category;
    categoryId: string;
    filesToUpload: File;
    image: string = Constants.PLACEHOLDER_350x350;

    constructor(private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private toasterService: ToasterService,
        private helperService: HelperService,
        private router: Router,
        private route: ActivatedRoute) {
        this.categoryId = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            _id: '',
            name: ['', Validators.required],
            description: ['', [Validators.required, Validators.minLength(5)]],
            seo: this.formBuilder.group({
                metaKeywords: '',
                metaDescription: '',
                metaTitle: ['', Validators.required]
            }),
            config: this.formBuilder.group({
                hasDiscountsApplied: false,
                taxable: true,
                freeDelivery: true
            }),
            image: {
                fileName: '',
                mimeType: ''
            },
            createdOn: new Date(),
            modifiedOn: new Date()
        });
        if (this.categoryId != 'new') {
            this.categoryService.get<Category>(this.categoryId).subscribe(data => {
                delete data['__v'];
                this.category = data;
                this.categoryForm.setValue(this.category, { onlySelf: true });
                if (this.category.image.fileName)
                    this.image = `${Constants.API_URL}/upload-files/${this.category.image.fileName}`;
            });
        }
    }

    save() {
        if (this.categoryForm.valid) {
            this.categoryService.save(this.categoryForm.value, this.filesToUpload).subscribe(result => {
                this.toasterService.success('Category has been saved.');
                this.router.navigate(['/admin/category']);
            });
        }
        else {
            this.helperService.validateFields(this.categoryForm);
        }
    }

    onFileChange(fileInput: FileList) {
        let reader = new FileReader();
        let file = fileInput.item(0);
        this.filesToUpload = file;
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
            this.image = e.target.result;
        }
    }
}