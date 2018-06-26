import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { mergeMap } from 'rxjs/operators';
import { forkJoin } from "rxjs/observable/forkJoin";

import { Category } from '../index';
import { BaseRepositoryService, UploadFileService, FileModel } from '../../../shared/index';

@Injectable()
export class CategoryService extends BaseRepositoryService {
    constructor(
        private httpClient: HttpClient,
        private uploadFileService: UploadFileService) {
        super(httpClient, 'admin/category');
    }

    save(category: Category, file: File): Observable<any> {
        if (file) {
            let deleteFile: Observable<any>;
            let saveCategory = this.uploadFileService.upload(file).pipe(
                mergeMap((uploadResult: FileModel) => {
                    category.image = uploadResult;
                    return this._save(category);
                })
            );
            if (category.image.fileName) {
                deleteFile = this.uploadFileService.delete(category.image.fileName);
                return forkJoin([saveCategory, deleteFile]);
            }
            else
                return saveCategory;
        }
        else {
            return this._save(category);
        }
    }

    private _save(category: Category): Observable<Category> {
        if (category._id == '') {
            delete category._id;
            return this.post(category);
        }
        else {
            return this.put(category, category._id);
        }
    }
}