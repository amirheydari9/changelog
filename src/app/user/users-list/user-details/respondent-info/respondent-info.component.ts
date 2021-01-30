import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {RespondentService} from '../../../../services/respondent/respondent.service';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {RespondentInterpretComponent} from './respondent-interpret/respondent-interpret.component';

@Component({
    selector: 'app-respondent-info',
    templateUrl: './respondent-info.component.html',
    styleUrls: ['./respondent-info.component.scss']
})
export class RespondentInfoComponent implements OnInit {

    @Input() userData: any;

    // displayedColumns: string[] = ['testType', 'title', 'isActive', 'resultStatus', 'completionDate', 'action'];
    displayedColumns: string[] = ['testType', 'title', 'resultStatus', 'completionDate', 'action'];
    dataSource = new MatTableDataSource<any>();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private respondentService: RespondentService,
        private alertService: ToastrService
    ) {
    }

    ngOnInit() {
        this.dataSource = new MatTableDataSource<any>(this.userData.respondent);
        this.dataSource.paginator = this.paginator;
    }

    viewDetail($event: MouseEvent, element: any) {

        this.respondentService.getRespondentDetail(this.userData.applicant.id, element.id).subscribe(
            (data) => {
                const dialogRef = this.dialog.open(RespondentInterpretComponent, {
                    disableClose: true,
                    data: data
                });
            }
            , error => this.alertService.error('خطا در دریافت اطلاعات آزمون')
        )
    }
}
