import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {contractTypes, jobStatus, incomTypes} from '../../../../shared/contstants/constants';
import {UsersListService} from '../../../../services/user/users-list.service';

@Component({
    selector: 'app-job-info',
    templateUrl: './job-info.component.html',
    styleUrls: ['./job-info.component.scss']
})
export class JobInfoComponent implements OnInit {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    jobStatus = jobStatus;
    contractTypes = contractTypes;
    incomTypes = incomTypes;

    jobInfoForm: FormGroup;

    constructor(
        private userService: UsersListService
    ) {
    }

    ngOnInit() {

        this.initForm();

        if (!this.isTebyanAdmin) {
            this.jobInfoForm.disable();
        }

        if (this.userData.applicant.gender === 1) {
            this.jobStatus = this.jobStatus.filter(item => item.value != 2);
        }

        if (this.userData.applicant.jobStatus > 2) {
            this.jobInfoForm.controls.jobTitle.enable();
            this.jobInfoForm.controls.contractType.enable();
            this.jobInfoForm.controls.workplaceName.enable();
        }
        if (this.userData.applicant.jobStatus < 3) {
            this.jobInfoForm.controls.jobTitle.disable();
            this.jobInfoForm.controls.contractType.disable();
            this.jobInfoForm.controls.workplaceName.disable();
        }

        this.jobInfoForm.controls.jobStatus.valueChanges.subscribe(
            (data) => {
                 this.userService.jobStatus.next(data);
                if (data > 2) {
                    this.jobInfoForm.controls.jobTitle.enable();
                    this.jobInfoForm.controls.contractType.enable();
                    this.jobInfoForm.controls.workplaceName.enable();
                } else {
                    this.jobInfoForm.controls.jobTitle.disable();
                    this.jobInfoForm.controls.contractType.disable();
                    this.jobInfoForm.controls.workplaceName.disable();
                    this.jobInfoForm.controls.jobTitle.setValue(null);
                    this.jobInfoForm.controls.contractType.setValue(null);
                    this.jobInfoForm.controls.workplaceName.setValue(null);
                }
            }
        );

        this.jobInfoForm.valueChanges.subscribe(() => {
            if (this.jobInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.jobInfoForm.valid) {
                this.formHasError.emit(false);
                const data = {
                    jobStatus: this.jobInfoForm.controls.jobStatus.value,
                    jobTitle: this.jobInfoForm.controls.jobTitle.value,
                    contractType: this.jobInfoForm.controls.contractType.value,
                    workplaceName: this.jobInfoForm.controls.workplaceName.value,
                    jobDescription: this.jobInfoForm.controls.jobDescription.value,
                };
                this.userInfoChanged.emit(data);
            }
        });
    }

    initForm() {
        this.jobInfoForm = new FormGroup({
            jobStatus: new FormControl(this.userData.applicant.jobStatus),
            jobTitle: new FormControl(this.userData.applicant.jobTitle),
            contractType: new FormControl(this.userData.applicant.contractType),
            workplaceName: new FormControl(this.userData.applicant.workplaceName),
            jobDescription: new FormControl(this.userData.applicant.jobDescription),
        })
    }

    public errorHandling = (control: string, error: string) => {
        if (this.jobInfoForm.get(control)) {
            return this.jobInfoForm.get(control).hasError(error);
        }
    };
}
