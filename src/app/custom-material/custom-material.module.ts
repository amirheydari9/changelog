import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

import {Ng5SliderModule} from 'ng5-slider';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';

import {  DateAdapter,  MAT_DATE_FORMATS,  MAT_DATE_LOCALE } from '@angular/material';
import { MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS } from './material.persian-date.adapter';

const materialComponents = [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatDialogModule,
    Ng5SliderModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatCardModule,
    MatTooltipModule
];

@NgModule({
    imports: [materialComponents],
    exports: [materialComponents],
    providers: [
        { provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS }
    ]
})
export class CustomMaterialModule {
}
