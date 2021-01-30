import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Options} from 'ng5-slider';
import {
    matchmakingClothingTypes,
    matchmakingEducationSections,
    matchmakingEyeColors,
    matchmakingLimbTypes,
    matchmakingMaritalStatuses,
    matchmakingSkinColors
} from 'app/shared/contstants/constants';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    matchmakingSkinColors = matchmakingSkinColors;
    matchmakingEyeColors = matchmakingEyeColors;
    matchmakingBodyWeightCategories = matchmakingLimbTypes;
    matchmakingEducationSections = matchmakingEducationSections;
    matchmakingMaritalStatuses = matchmakingMaritalStatuses;
    matchmakingClothingTypes = matchmakingClothingTypes;

    likesForm: FormGroup;

    initialSkinColor = [];
    initialEyeColor = [];
    initialBodyWeightCategory = [];
    initialEducationalStage = [];
    initialMartialStatus = [];
    initialClothingType = [];

    enableSwitchArr = [0, 3, 4];

    birthdayOptions: Options = {
        floor: 1300,
        ceil: 1400,
        draggableRange: true,
    };

    weightOptions: Options = {
        floor: 40,
        ceil: 200,
        draggableRange: true,
    };

    heightOptions: Options = {
        floor: 100,
        ceil: 250,
        draggableRange: true,
    };

    constructor() {
    }

    ngOnInit() {

        switch (this.userData.applicant.gender) {
            case 1:
                this.matchmakingClothingTypes = this.matchmakingClothingTypes.filter(
                    item => item.value === 0 || item.value === 1 || item.value === 2 || item.value === 3 || item.value === 8 || item.value === 100);
                break;
            case 2:
                this.matchmakingClothingTypes = this.matchmakingClothingTypes.filter(
                    item => item.value === 0 || item.value === 4 || item.value === 5 || item.value === 6 || item.value === 7 || item.value === 8 || item.value === 100);
                break;
        }

        this.userData.applicant.matchmakingSkinColors.forEach(item => {
            this.matchmakingSkinColors.filter(value => {
                if (value.value === item) {
                    this.initialSkinColor.push(value);
                }
            })
        });

        this.userData.applicant.matchmakingEyeColors.forEach(item => {
            this.matchmakingEyeColors.filter(value => {
                if (value.value === item) {
                    this.initialEyeColor.push(value);
                }
            })
        });

        this.userData.applicant.matchmakingBodyWeightCategories.forEach(item => {
            this.matchmakingBodyWeightCategories.filter(value => {
                if (value.value === item) {
                    this.initialBodyWeightCategory.push(value);
                }
            })
        });

        this.userData.applicant.matchmakingEducationalStages.forEach(item => {
            this.matchmakingEducationSections.filter(value => {
                if (value.value === item) {
                    this.initialEducationalStage.push(value);
                }
            })
        });

        this.userData.applicant.matchmakingMaritalStatuses.forEach(item => {
            this.matchmakingMaritalStatuses.filter(value => {
                if (value.value === item) {
                    this.initialMartialStatus.push(value);
                }
            })
        });

        this.userData.applicant.matchmakingClothingTypes.forEach(item => {
            this.matchmakingClothingTypes.filter(value => {
                if (value.value === item) {
                    this.initialClothingType.push(value);
                }
            })
        });

        this.initForm();

        if (!this.isTebyanAdmin) {
            this.likesForm.disable();
        }

        this.likesForm.controls.matchmakingAcceptChildrenOfPartner.disable();

        console.log(this.initialMartialStatus, ' this.initialMartialStatus');

        this.initialMartialStatus.forEach(item => {
            if (item.value === 0 || item.value === 3 || item.value === 4) {
                this.likesForm.controls.matchmakingAcceptChildrenOfPartner.enable();
            }
        });

        this.likesForm.controls.matchmakingMaritalStatuses.valueChanges.subscribe(
            (data) => {
                const arr = [];
                let flag;
                if (data.length > 0) {
                    data.forEach(item => {
                        arr.push(item.value)
                    });
                    this.enableSwitchArr.forEach(item => {
                        if (arr.includes(item)) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.likesForm.controls.matchmakingAcceptChildrenOfPartner.enable();
                    } else {
                        this.likesForm.controls.matchmakingAcceptChildrenOfPartner.disable();
                        this.likesForm.controls.matchmakingAcceptChildrenOfPartner.setValue(false);
                    }
                } else {
                    this.likesForm.controls.matchmakingAcceptChildrenOfPartner.disable();
                    this.likesForm.controls.matchmakingAcceptChildrenOfPartner.setValue(false);
                }
            }
        );

        this.likesForm.valueChanges.subscribe(() => {
            if (this.likesForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.likesForm.valid) {
                this.formHasError.emit(false);

                const minimumBirthYear = this.likesForm.controls.matchmakingBirthYear.value[0];
                const maximumBirthYear = this.likesForm.controls.matchmakingBirthYear.value[1];

                const minimumWeight = this.likesForm.controls.matchmakingWeight.value[0];
                const maximumWeight = this.likesForm.controls.matchmakingWeight.value[1];

                const minimumHeight = this.likesForm.controls.matchmakingHeight.value[0];
                const maximumHeight = this.likesForm.controls.matchmakingHeight.value[1];

                const skinColors = [];
                this.likesForm.controls.matchmakingSkinColors.value.forEach(item => skinColors.push(item.value));

                const eyeColors = [];
                this.likesForm.controls.matchmakingEyeColors.value.forEach(item => eyeColors.push(item.value));

                const educationalStages = [];
                this.likesForm.controls.matchmakingEducationalStages.value.forEach(item => educationalStages.push(item.value));

                const maritalStatuses = [];
                this.likesForm.controls.matchmakingMaritalStatuses.value.forEach(item => maritalStatuses.push(item.value));

                const bodyWeightCategories = [];
                this.likesForm.controls.matchmakingBodyWeightCategories.value.forEach(item => bodyWeightCategories.push(item.value));

                const clothingTypes = [];
                this.likesForm.controls.matchmakingClothingTypes.value.forEach(item => clothingTypes.push(item.value));

                this.userInfoChanged.emit({
                    matchmakingMinimumBirthYear: minimumBirthYear,
                    matchmakingMaximumBirthYear: maximumBirthYear,
                    matchmakingMinimumWeight: minimumWeight,
                    matchmakingMaximumWeight: maximumWeight,
                    matchmakingMinimumHeight: minimumHeight,
                    matchmakingMaximumHeight: maximumHeight,
                    matchmakingSkinColors: skinColors,
                    matchmakingEducationalStages: educationalStages,
                    matchmakingMaritalStatuses: maritalStatuses,
                    matchmakingEyeColors: eyeColors,
                    matchmakingClothingTypes: clothingTypes,
                    matchmakingBodyWeightCategories: bodyWeightCategories,
                    matchmakingAcceptChildrenOfPartner: this.likesForm.controls.matchmakingAcceptChildrenOfPartner.value,
                    matchmakingDescription: this.likesForm.controls.matchmakingDescription.value,
                })
            }
        });

    }

    initForm() {
        this.likesForm = new FormGroup({

            matchmakingBirthYear: new FormControl(
                [this.userData.applicant.matchmakingMinimumBirthYear, this.userData.applicant.matchmakingMaximumBirthYear]),
            matchmakingMinimumBirthYear: new FormControl(this.userData.applicant.matchmakingMinimumBirthYear),
            matchmakingMaximumBirthYear: new FormControl(this.userData.applicant.matchmakingMaximumBirthYear),

            matchmakingWeight: new FormControl(
                [this.userData.applicant.matchmakingMinimumWeight, this.userData.applicant.matchmakingMaximumWeight]),
            matchmakingMinimumWeight: new FormControl(this.userData.applicant.matchmakingMinimumWeight),
            matchmakingMaximumWeight: new FormControl(this.userData.applicant.matchmakingMaximumWeight),

            matchmakingHeight: new FormControl(
                [this.userData.applicant.matchmakingMinimumHeight, this.userData.applicant.matchmakingMaximumHeight]),
            matchmakingMinimumHeight: new FormControl(this.userData.applicant.matchmakingMinimumHeight),
            matchmakingMaximumHeight: new FormControl(this.userData.applicant.matchmakingMaximumHeight),

            matchmakingSkinColors: new FormControl(this.initialSkinColor),
            matchmakingEducationalStages: new FormControl(this.initialEducationalStage),
            matchmakingMaritalStatuses: new FormControl(this.initialMartialStatus),
            matchmakingEyeColors: new FormControl(this.initialEyeColor),
            matchmakingBodyWeightCategories: new FormControl(this.initialBodyWeightCategory),
            matchmakingClothingTypes: new FormControl(this.initialClothingType),
            matchmakingAcceptChildrenOfPartner: new FormControl(this.userData.applicant.matchmakingAcceptChildrenOfPartner),

            matchmakingDescription: new FormControl(this.userData.applicant.matchmakingDescription),
        })
    }
}
