import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {CommonService} from '../../../../services/common/common.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {documentTypes} from '../../../../shared/contstants/constants';
import {ApplicantDocumentsService} from '../../../../services/applicant-documents/applicant-documents.service';
import {UsersListService} from '../../../../services/user/users-list.service';

@Component({
    selector: 'app-upload-file',
    templateUrl: './upload-file.component.html',
    styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit, OnDestroy {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;

    documentTypes = documentTypes;
    uploadDocumentsForm: FormGroup;
    // displayedColumns: string[] = ['image', 'documentType', 'description', 'approved', 'approvementDecription', 'action'];
    displayedColumns: string[] = ['image', 'documentType', 'description', 'action'];
    dataSource = new MatTableDataSource<any>();
    imagePath = '';
    conscriptionStatus;
    jobStatus;

    // @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
    //     this.dataSource.paginator = value;
    // }

    @ViewChild(MatPaginator) paginator: MatPaginator;


    constructor(
        private commonService: CommonService,
        private alertService: ToastrService,
        private applicantDocumentsService: ApplicantDocumentsService,
        private userService: UsersListService,
    ) {
    }

    ngOnInit() {
        this.initForm();
        if (!this.isTebyanAdmin) {
            this.uploadDocumentsForm.disable();
        }
        this.conscriptionStatus = this.userData.applicant.conscriptionStatus;
        this.jobStatus = this.userData.applicant.jobStatus;

        if (this.userData.applicant.gender === 2) {
            this.documentTypes = this.documentTypes.filter(item => item.value !== 6);
        }
        this.userService.conscriptionStatus.subscribe(
            (data) => {
                this.conscriptionStatus = data;
            }
        );
        this.userService.jobStatus.subscribe(
            (data) => {
                this.jobStatus = data;
            }
        );
        this.dataSource = new MatTableDataSource<any>(this.userData.documents);
        this.dataSource.paginator = this.paginator;
    }

    initForm() {

        this.uploadDocumentsForm = new FormGroup({
            documentType: new FormControl(null, [Validators.required]),
            fileId: new FormControl(null, [Validators.required]),
            description: new FormControl(null),
        })
    }

    onFileChanged($event: Event) {

        this.commonService.uploadFile($event.target['files'][0]).subscribe((data) => {
            this.uploadDocumentsForm.controls.fileId.setValue(data.data.fileId);
            this.imagePath = environment.imageUrl + data.data.fileId
        }, error => this.alertService.error('آپلود تصویر انجام نشد'));
    }

    uploadDocument() {

        if (
            (this.conscriptionStatus === 1 || this.conscriptionStatus === 2 || this.conscriptionStatus === 3 || this.conscriptionStatus === 5)
            && this.uploadDocumentsForm.controls.documentType.value === 6
        ) {
            this.alertService.warning('با توجه به وضعیت نظام وظیفه این مدرک قابل ارسال نمی باشد');
            return;
        }
        if ((this.jobStatus === 1 || this.jobStatus === 2) && this.uploadDocumentsForm.controls.documentType.value === 8) {
            this.alertService.warning('با توجه به وضعیت اشتغال این مدرک قابل ارسال نمی باشد');
            return;
        }

        if (this.uploadDocumentsForm.valid) {

            const document = this.dataSource.data.find(
                item => item.documentType == this.uploadDocumentsForm.controls.documentType.value && this.uploadDocumentsForm.controls.documentType.value != 100);

            if (document) {
                this.alertService.warning('نوع مدرک تکراری است در صورت تمایل به بارگذاری مدرک جدید ، مدرک قبلی را حذف نمایید');
                return;
            } else {
                this.applicantDocumentsService.createDocument(this.userData.applicant.id, this.uploadDocumentsForm.value).subscribe(
                    (res) => {
                        this.alertService.success('آپلود مدرک با موفقیت انجام شد');
                        this.applicantDocumentsService.getAllDocuments(this.userData.applicant.id).subscribe(
                            (data) => {
                                this.dataSource = new MatTableDataSource<any>(data.documents);
                                this.dataSource.paginator = this.paginator;
                                this.paginator.lastPage();
                            });
                    },
                    error => this.alertService.error('آپلود مدرک انجام نشد')
                )
            }
        }
    }

    deleteDocument($event: MouseEvent, element: any) {

        this.applicantDocumentsService.deleteDocument(this.userData.applicant.id, element.id).subscribe(
            () => {
                this.alertService.success('عملیات با موفقیت انجام شد');
                this.applicantDocumentsService.getAllDocuments(this.userData.applicant.id).subscribe(
                    (data) => {
                        this.dataSource = new MatTableDataSource<any>(data.documents);
                        this.dataSource.paginator = this.paginator;
                    });
            }, error => this.alertService.error('عملیات انجام نشد')
        )
    }

    ngOnDestroy(): void {
        this.uploadDocumentsForm.reset();
        // TODO unsubscribe observables
    }

}
