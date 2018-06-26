import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
    ValidationMessageComponent,
    ToasterService,
    HelperService,
    UploadFileService
} from './index';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        ValidationMessageComponent
    ],
    exports: [
        ValidationMessageComponent,
        RouterModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[
        ToasterService,
        HelperService,
        UploadFileService
    ]
})
export class SharedModule { }