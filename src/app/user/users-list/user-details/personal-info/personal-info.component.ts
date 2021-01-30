import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {
    limbTypes,
    skinColors,
    eyeColors,
    clothingTypes,
    militaryServiceStatuses,
} from 'app/shared/contstants/constants';
import {UsersListService} from '../../../../services/user/users-list.service';

@Component({
    selector: 'app-personal-info',
    templateUrl: './personal-info.component.html',
    styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    limbTypes = limbTypes;
    skinColors = skinColors;
    eyeColors = eyeColors;
    clothingTypes = clothingTypes;
    militaryServiceStatuses = militaryServiceStatuses;

    personalInfoForm: FormGroup;

    WomenOfFamilyClothingType = [];
    initialWomenOfFamilyClothingType = [];

    constructor(
        private userService: UsersListService
    ) {
    }

    ngOnInit() {

        this.initForm();

        if (!this.isTebyanAdmin) {
            this.personalInfoForm.disable();
        }

        this.WomenOfFamilyClothingType = this.clothingTypes.filter(
            item => item.value === 1 || item.value === 2 || item.value === 3 || item.value === 8 || item.value === 100
        );

        switch (this.userData.applicant.gender) {
            case 1:
                this.clothingTypes = this.clothingTypes.filter(
                    item => item.value === 4 || item.value === 5 || item.value === 6 || item.value === 7 || item.value === 8 || item.value === 100);
                break;
            case 2:
                this.clothingTypes = this.clothingTypes.filter(
                    item => item.value === 1 || item.value === 2 || item.value === 3 || item.value === 8 || item.value === 100);
                break;
        }

        this.userData.applicant.womenOfFamilyClothingTypes.forEach(item => {
            this.WomenOfFamilyClothingType.filter(value => {
                if (value.value === item) {
                    this.initialWomenOfFamilyClothingType.push(value);
                }
            })
        });

        if (this.userData.applicant.gender === 1) {
            this.personalInfoForm.controls.militaryServiceStatus.valueChanges.subscribe(
                (data) => this.userService.conscriptionStatus.next(data)
            );
        }

        this.personalInfoForm.valueChanges.subscribe(() => {
            if (this.personalInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.personalInfoForm.valid) {
                this.formHasError.emit(false);
                const arr = [];
                this.personalInfoForm.controls.womenOfFamilyClothingTypes.value.forEach(item => {
                    arr.push(item.value);
                });
                this.userInfoChanged.emit({
                    height: +this.personalInfoForm.controls.height.value,
                    weight: +this.personalInfoForm.controls.weight.value,
                    skinColor: this.personalInfoForm.controls.skinColor.value,
                    eyeColor: this.personalInfoForm.controls.eyeColor.value,
                    bodyWeightCategory: this.personalInfoForm.controls.limbType.value,
                    clothingType: this.personalInfoForm.controls.clothingType.value,
                    conscriptionStatus: this.personalInfoForm.controls.militaryServiceStatus.value,
                    hasSpecificDisease: this.personalInfoForm.controls.hasSpecificDisease.value,
                    specificDiseaseName: this.personalInfoForm.controls.specificDiseaseName.value,
                    hasDisability: this.personalInfoForm.controls.hasDisability.value,
                    disabilityName: this.personalInfoForm.controls.disabilityName.value,
                    womenOfFamilyClothingTypes: arr,
                    appearanceInformationDescription: this.personalInfoForm.controls.appearanceInformationDescription.value,
                })
            }
        });
    }

    initForm() {
        this.personalInfoForm = new FormGroup({
            height: new FormControl(this.userData.applicant.height, [Validators.required]),
            weight: new FormControl(this.userData.applicant.weight, [Validators.required]),
            skinColor: new FormControl(this.userData.applicant.skinColor),
            eyeColor: new FormControl(this.userData.applicant.eyeColor),
            limbType: new FormControl(this.userData.applicant.bodyWeightCategory),
            clothingType: new FormControl(this.userData.applicant.clothingType),
            womenOfFamilyClothingTypes: new FormControl(this.initialWomenOfFamilyClothingType),
            militaryServiceStatus: new FormControl(this.userData.applicant.conscriptionStatus),
            hasSpecificDisease: new FormControl(this.userData.applicant.hasSpecificDisease),
            specificDiseaseName: new FormControl(this.userData.applicant.specificDiseaseName),
            hasDisability: new FormControl(this.userData.applicant.hasDisability),
            disabilityName: new FormControl(this.userData.applicant.disabilityName),
            appearanceInformationDescription: new FormControl(this.userData.applicant.appearanceInformationDescription),
        })
    }

    public errorHandling = (control: string, error: string) => {
        return this.personalInfoForm.get(control).hasError(error);
    };

}
