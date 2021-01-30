import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
    educationalStage,
    educationStatus,
    seminaryEducationLevel,
    turbanWearingStatus,
    universityOrSchoolType
} from '../../../../shared/contstants/constants';
import {UsersListService} from '../../../../services/user/users-list.service';

@Component({
    selector: 'app-education-info',
    templateUrl: './education-info.component.html',
    styleUrls: ['./education-info.component.scss']
})
export class EducationInfoComponent implements OnInit {

    @Input() userData;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    religion;
    educationForm: FormGroup;

    seminaryEducationLevel = seminaryEducationLevel;
    turbanWearingStatus = turbanWearingStatus;
    educationStatus = educationStatus;
    educationalStage = educationalStage;
    universityOrSchoolType = universityOrSchoolType;

    universityOrSchoolTypeMock;

    constructor(
        private userService: UsersListService
    ) {
    }

    ngOnInit() {

        this.initForm();

        if (!this.isTebyanAdmin) {
            this.educationForm.disable();
        }

        this.religion = this.userData.applicant.religion;

        if (this.religion < 3) {
            this.educationForm.controls.seminaryEducationLevel.enable();
            if (this.userData.applicant.gender === 1) {
                this.educationForm.controls.turbanWearingStatus.enable();
            }
            if (this.userData.applicant.gender === 2) {
                this.educationForm.controls.turbanWearingStatus.disable()
            }
        }
        if (this.religion >= 3) {
            this.educationForm.controls.seminaryEducationLevel.disable();
            this.educationForm.controls.turbanWearingStatus.disable();
            this.educationForm.controls.seminaryEducationLevel.setValue(null);
            this.educationForm.controls.turbanWearingStatus.setValue(null);
            // this.educationForm.controls.turbanWearingStatus.clearValidators();
            // this.educationForm.controls.turbanWearingStatus.updateValueAndValidity();
        }

        this.userService.religion.subscribe(
            (data) => {
                this.religion = data;
                if (data < 3) {
                    this.educationForm.controls.seminaryEducationLevel.enable();
                    if (this.userData.applicant.gender === 1) {
                        this.educationForm.controls.turbanWearingStatus.enable()
                    }
                    if (this.userData.applicant.gender === 2) {
                        this.educationForm.controls.turbanWearingStatus.disable()
                    }
                }
                if (data >= 3) {
                    this.educationForm.controls.seminaryEducationLevel.disable();
                    this.educationForm.controls.turbanWearingStatus.disable();
                    this.educationForm.controls.seminaryEducationLevel.setValue(null);
                    this.educationForm.controls.turbanWearingStatus.setValue(null);
                    // this.educationForm.controls.turbanWearingStatus.clearValidators();
                    // this.educationForm.controls.turbanWearingStatus.updateValueAndValidity();
                }
            }
        );

        this.educationForm.controls.seminaryEducationLevel.valueChanges.subscribe(
            (data) => {
                if (data === 1) {
                    // this.educationForm.controls.turbanWearingStatus.clearValidators();
                    // this.educationForm.controls.turbanWearingStatus.updateValueAndValidity();
                    this.educationForm.controls.turbanWearingStatus.setValue(null);
                    this.educationForm.controls.turbanWearingStatus.disable();
                }
                if (data > 1 && this.userData.applicant.gender === 1) {
                    // this.educationForm.controls.turbanWearingStatus.setValidators([Validators.required]);
                    // this.educationForm.controls.turbanWearingStatus.updateValueAndValidity();
                    this.educationForm.controls.turbanWearingStatus.enable();
                    // this.educationForm.controls.turbanWearingStatus.markAsTouched();
                }
            }
        );

        if (this.userData.applicant.educationalStage >= 7 && this.userData.applicant.educationalStage <= 11) {
            this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value > 2);
            // this.educationForm.controls.fieldOfStudy.setValidators([Validators.required]);
            // this.educationForm.controls.fieldOfStudy.updateValueAndValidity();
        }
        if (this.userData.applicant.educationalStage >= 4 && this.userData.applicant.educationalStage <= 6) {
            this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value <= 2 || item.value === 100);
            // this.educationForm.controls.fieldOfStudy.setValidators([Validators.required]);
            // this.educationForm.controls.fieldOfStudy.updateValueAndValidity();
        }
        if (this.userData.applicant.educationalStage >= 1 && this.userData.applicant.educationalStage <= 3) {
            this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value <= 2 || item.value === 100);
            this.educationForm.controls.fieldOfStudy.setValue(null);
            this.educationForm.controls.fieldOfStudy.disable();
        }

        this.educationForm.controls.educationalStage.valueChanges.subscribe(
            (data) => {
                this.educationForm.controls.universityOrSchoolType.setValue(null);
                // this.educationForm.controls.universityOrSchoolType.markAsTouched();
                if (data >= 7 && data <= 11) {
                    this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value > 2);
                    // this.educationForm.controls.fieldOfStudy.setValidators([Validators.required]);
                    // this.educationForm.controls.fieldOfStudy.markAsTouched();
                    // this.educationForm.controls.fieldOfStudy.updateValueAndValidity();
                    this.educationForm.controls.fieldOfStudy.enable();
                }
                if (data >= 4 && data <= 6) {
                    this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value <= 2 || item.value === 100);
                    // this.educationForm.controls.fieldOfStudy.setValidators([Validators.required]);
                    // this.educationForm.controls.fieldOfStudy.updateValueAndValidity();
                    // this.educationForm.controls.fieldOfStudy.markAsTouched();
                    this.educationForm.controls.fieldOfStudy.enable();
                }
                if (data >= 1 && data <= 3) {
                    this.universityOrSchoolTypeMock = this.universityOrSchoolType.filter(item => item.value <= 2 || item.value === 100);
                    // this.educationForm.controls.fieldOfStudy.clearValidators();
                    // this.educationForm.controls.fieldOfStudy.updateValueAndValidity();
                    this.educationForm.controls.fieldOfStudy.setValue(null);
                    this.educationForm.controls.fieldOfStudy.disable();
                }
            }
        );

        this.educationForm.valueChanges.subscribe(() => {
            if (this.educationForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.educationForm.valid) {
                this.formHasError.emit(false);
                const data = {
                    educationStatus: this.educationForm.controls.educationStatus.value,
                    educationalStage: this.educationForm.controls.educationalStage.value,
                    fieldOfStudy: this.educationForm.controls.fieldOfStudy.value,
                    universityOrSchoolType: this.educationForm.controls.universityOrSchoolType.value,
                    universityOrSchoolName: this.educationForm.controls.universityOrSchoolName.value,
                    educationProfileDescription: this.educationForm.controls.educationProfileDescription.value,
                    seminaryEducationLevel: this.educationForm.controls.seminaryEducationLevel.value,
                    turbanWearingStatus: this.educationForm.controls.turbanWearingStatus.value,
                };
                this.userInfoChanged.emit(data);
            }
        });
    }

    initForm() {
        this.educationForm = new FormGroup({
            seminaryEducationLevel: new FormControl(this.userData.applicant.seminaryEducationLevel),
            turbanWearingStatus: new FormControl(this.userData.applicant.turbanWearingStatus),
            educationStatus: new FormControl(this.userData.applicant.educationStatus),
            educationalStage: new FormControl(this.userData.applicant.educationalStage),
            fieldOfStudy: new FormControl(this.userData.applicant.fieldOfStudy),
            // universityOrSchoolType: new FormControl(this.userData.applicant.universityOrSchoolType, [Validators.required]),
            universityOrSchoolType: new FormControl(this.userData.applicant.universityOrSchoolType),
            universityOrSchoolName: new FormControl(this.userData.applicant.universityOrSchoolName),
            educationProfileDescription: new FormControl(this.userData.applicant.educationProfileDescription),
        })
    }

    public errorHandling = (control: string, error: string) => {
        if (this.educationForm.get(control)) {
            return this.educationForm.get(control).hasError(error);
        }
    };

}
