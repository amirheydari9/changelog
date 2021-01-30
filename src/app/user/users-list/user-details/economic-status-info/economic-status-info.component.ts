import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {
    economicSituations,
    hasAPrivateHouses,
    homeOwnershipStatuses,
    incomTypes,
    wealthTypes
} from '../../../../shared/contstants/constants';

@Component({
    selector: 'app-economic-status-info',
    templateUrl: './economic-status-info.component.html',
    styleUrls: ['./economic-status-info.component.scss']
})
export class EconomicStatusInfoComponent implements OnInit {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    economicStatusInfoForm: FormGroup;

    wealthTypes = wealthTypes;
    economicSituations = economicSituations;
    homeOwnershipStatuses = homeOwnershipStatuses;
    incomTypes = incomTypes;
    hasAPrivateHouses = hasAPrivateHouses;


    constructor() {
    }

    ngOnInit() {

        this.initForm();
        if (!this.isTebyanAdmin) {
            this.economicStatusInfoForm.disable();
        }
        this.economicStatusInfoForm.valueChanges.subscribe(() => {
            if (this.economicStatusInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.economicStatusInfoForm.valid) {
                this.formHasError.emit(false);
                this.userInfoChanged.emit({
                    familySocioeconomicStatus: this.economicStatusInfoForm.controls.familySocioeconomicStatus.value,
                    familyHomeOwnershipStatus: this.economicStatusInfoForm.controls.familyHomeOwnershipStatus.value,
                    familySocioeconomicDescription: this.economicStatusInfoForm.controls.familySocioeconomicDescription.value,
                    hasAPrivateHouse: this.economicStatusInfoForm.controls.hasAPrivateHouse.value,
                    monthlyAverageIncome: this.economicStatusInfoForm.controls.monthlyAverageIncome.value,
                    wealth: this.economicStatusInfoForm.controls.wealth.value,
                    economicsDescription: this.economicStatusInfoForm.controls.economicsDescription.value,
                })
            }
        });
    }

    initForm() {
        this.economicStatusInfoForm = new FormGroup({
            familySocioeconomicStatus: new FormControl(this.userData.applicant.familySocioeconomicStatus),
            familyHomeOwnershipStatus: new FormControl(this.userData.applicant.familyHomeOwnershipStatus),
            hasAPrivateHouse: new FormControl(this.userData.applicant.hasAPrivateHouse),
            monthlyAverageIncome: new FormControl(this.userData.applicant.monthlyAverageIncome),
            wealth: new FormControl(this.userData.applicant.wealth),
            familySocioeconomicDescription: new FormControl(this.userData.applicant.familySocioeconomicDescription),
            economicsDescription: new FormControl(this.userData.applicant.economicsDescription),
        })
    }

}
