import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BaseRepositoryService } from '../index';

@Injectable()
export class UploadFileService extends BaseRepositoryService {
    constructor(private httpClient: HttpClient) {
        super(httpClient, 'upload')
    }

    upload(file: File) {
        let formData: FormData = new FormData();
        formData.append('file', file, file.name);

        return this.post(formData);
    }
}