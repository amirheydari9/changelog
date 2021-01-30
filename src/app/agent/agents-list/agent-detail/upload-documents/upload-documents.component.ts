import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {documentTypes} from '../../../../shared/contstants/constants';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../../services/common/common.service';
import {AgentService} from '../../../../services/agent/agent.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
    selector: 'app-upload-documents',
    templateUrl: './upload-documents.component.html',
    styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit, OnDestroy {

    @Input() agentData: any;
    documentTypes = documentTypes;
    uploadDocumentsForm: FormGroup;
    displayedColumns: string[] = ['image', 'documentType', 'description', 'action'];
    dataSource = new MatTableDataSource<any>();
    imagePath = '';

    @ViewChild(MatPaginator) set paginator(value: MatPaginator) {
        this.dataSource.paginator = value;
    }

    constructor(
        private commonService: CommonService,
        private agentService: AgentService,
        private alertService: ToastrService
    ) {
    }

    ngOnInit() {
        if (this.agentData && this.agentData.documents && this.agentData.documents.length > 0) {
            this.dataSource = new MatTableDataSource<any>(this.agentData.documents);
        }
        this.initForm();
    }

    initForm() {

        this.uploadDocumentsForm = new FormGroup({
            documentType: new FormControl(null, [Validators.required]),
            fileId: new FormControl(null, [Validators.required]),
            description: new FormControl(),
        })
    }

    onFileChanged($event: Event) {

        this.commonService.uploadFile($event.target['files'][0]).subscribe((data) => {
            this.uploadDocumentsForm.controls.fileId.setValue(data.data.fileId);
            this.imagePath = environment.imageUrl + data.data.fileId
        }, error => this.alertService.error('آپلود تصویر انجام نشد'));
    }

    uploadDocument() {

        if (this.uploadDocumentsForm.valid) {

            const document = this.dataSource.data.find(
                item => item.documentType == this.uploadDocumentsForm.controls.documentType.value && this.uploadDocumentsForm.controls.documentType.value != 100);

            if (document) {
                this.alertService.warning('نوع مدرک تکراری است در صورت تمایل به بارگذاری مدرک جدید ، مدرک قبلی را حذف نمایید');
                return;
            } else {
                this.agentService.uploadAgentDocument(this.agentData.agent.id, this.uploadDocumentsForm.value).subscribe(
                    (res) => {
                        this.alertService.success('آپلود مدرک با موفقیت انجام شد');
                        this.agentService.getAgentById(this.agentData.agent.id).subscribe(
                            (data) => {
                                this.dataSource = new MatTableDataSource<any>(data.documents);
                            });
                    },
                    error => this.alertService.error('آپلود مدرک انجام نشد')
                )
            }
        }
    }

    deleteDocument($event: MouseEvent, element: any) {
        this.agentService.deleteAgentDocument(this.agentData.agent.id, element.id).subscribe(
            () => {
                this.alertService.success('عملیات با موفقیت انجام شد');
                this.agentService.getAgentById(this.agentData.agent.id).subscribe(
                    (data) => {
                        this.dataSource = new MatTableDataSource<any>(data.documents);
                    });
            }, error => this.alertService.error('عملیات انجام نشد')
        )
    }

    ngOnDestroy(): void {
        this.uploadDocumentsForm.reset();
        // TODO unsubscribe observables
    }
}

