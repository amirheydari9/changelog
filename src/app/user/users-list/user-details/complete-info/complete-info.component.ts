import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
    listeningToMusicStatus,
    livingAbroadTendency,
    livingTogetherDuration,
    maritalStatuses,
    religiousPractice
} from '../../../../shared/contstants/constants'

@Component({
    selector: 'app-complete-info',
    templateUrl: './complete-info.component.html',
    styleUrls: ['./complete-info.component.scss']
})
export class CompleteInfoComponent implements OnInit {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    religiousPractice = religiousPractice;
    listeningToMusicStatus = listeningToMusicStatus;
    livingAbroadTendency = livingAbroadTendency;
    livingTogetherDuration = livingTogetherDuration;
    maritalStatus = maritalStatuses;

    completeInfoForm: FormGroup;

    constructor() {
    }

    ngOnInit() {

        this.initForm();

        if (!this.isTebyanAdmin) {
            this.completeInfoForm.disable();
        }

        if (this.userData.applicant.maritalStatus > 2) {
            this.completeInfoForm.controls.livingTogetherDuration.enable();
            this.completeInfoForm.controls.childrenCount.enable();
        }
        if (this.userData.applicant.maritalStatus <= 2) {
            this.completeInfoForm.controls.livingTogetherDuration.disable();
            this.completeInfoForm.controls.childrenCount.disable();
        }

        this.completeInfoForm.controls.maritalStatus.valueChanges.subscribe(
            (data) => {
                if (data > 2) {
                    this.completeInfoForm.controls.livingTogetherDuration.enable();
                    this.completeInfoForm.controls.childrenCount.enable();
                } else {
                    this.completeInfoForm.controls.livingTogetherDuration.disable();
                    this.completeInfoForm.controls.childrenCount.disable();
                    this.completeInfoForm.controls.livingTogetherDuration.setValue(null);
                    this.completeInfoForm.controls.childrenCount.setValue(null);
                }
            }
        );

        this.completeInfoForm.valueChanges.subscribe(() => {
            if (this.completeInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.completeInfoForm.valid) {
                this.formHasError.emit(false);
                const data = {
                    birthOrder: +this.completeInfoForm.controls.birthOrder.value,
                    familyMembersDescription: this.completeInfoForm.controls.familyMembersDescription.value,
                    religiousPractice: this.completeInfoForm.controls.religiousPractice.value,
                    smoking: this.completeInfoForm.controls.smoking.value,
                    listeningToMusicStatus: this.completeInfoForm.controls.listeningToMusicStatus.value,
                    livingAbroadTendency: this.completeInfoForm.controls.livingAbroadTendency.value,
                    maritalStatus: this.completeInfoForm.controls.maritalStatus.value,
                    livingTogetherDuration: this.completeInfoForm.controls.livingTogetherDuration.value,
                    childrenCount: +this.completeInfoForm.controls.childrenCount.value,
                    supplementaryDescription: this.completeInfoForm.controls.supplementaryDescription.value,
                    originality: this.completeInfoForm.controls.originality.value,
                };
                this.userInfoChanged.emit(data);
            }
        });
    }

    initForm() {
        this.completeInfoForm = new FormGroup({
            birthOrder: new FormControl(this.userData.applicant.birthOrder),
            familyMembersDescription: new FormControl(this.userData.applicant.familyMembersDescription),
            religiousPractice: new FormControl(this.userData.applicant.religiousPractice),
            smoking: new FormControl(this.userData.applicant.smoking),
            listeningToMusicStatus: new FormControl(this.userData.applicant.listeningToMusicStatus),
            livingAbroadTendency: new FormControl(this.userData.applicant.livingAbroadTendency),
            maritalStatus: new FormControl(this.userData.applicant.maritalStatus),
            livingTogetherDuration: new FormControl(this.userData.applicant.livingTogetherDuration),
            childrenCount: new FormControl(this.userData.applicant.childrenCount),
            supplementaryDescription: new FormControl(this.userData.applicant.supplementaryDescription),
            originality: new FormControl(this.userData.applicant.originality),
        })
    }

    public errorHandling = (control: string, error: string) => {
        if (this.completeInfoForm.get(control)) {
            return this.completeInfoForm.get(control).hasError(error);
        }
    };
}
