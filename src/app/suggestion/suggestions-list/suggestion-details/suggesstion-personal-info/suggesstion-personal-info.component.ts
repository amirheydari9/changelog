import {Component, Input, OnInit} from '@angular/core';
import {personalInfoDictionary} from '../../../../shared/contstants/suggestion-dictionary';
import {matchmakingClothingTypes} from 'app/shared/contstants/constants';

@Component({
    selector: 'app-suggesstion-personal-info',
    templateUrl: './suggesstion-personal-info.component.html',
    styleUrls: ['./suggesstion-personal-info.component.scss']
})
export class SuggesstionPersonalInfoComponent implements OnInit {

    @Input() suggestionInfo;

    dictionary: {} = personalInfoDictionary;
    applicantData = [];

    matchmakingClothingTypes = matchmakingClothingTypes;

    mateWomenOfFamilyClothingTypes = '';

    suggestedWomenOfFamilyClothingTypes = '';

    constructor() {
    }

    ngOnInit() {

        // TODO نوع پوشش خانم های خانواده
        for (const key in this.dictionary) {
            const row = {
                title: this.dictionary[key],
                mateInfo: this.suggestionInfo.mateUserInfo.applicant[key] ? this.suggestionInfo.mateUserInfo.applicant[key] : '-',
                suggestedInfo: this.suggestionInfo.suggestedUserInfo.applicant[key] ? this.suggestionInfo.suggestedUserInfo.applicant[key] : '-'
            };
            if (row.title) {
                if (row.mateInfo === true) {
                    row.mateInfo = 'بله'
                }
                if (row.mateInfo === false) {
                    row.mateInfo = 'خیر'
                }
                if (row.suggestedInfo === true) {
                    row.suggestedInfo = 'بله'
                }
                if (row.suggestedInfo === false) {
                    row.suggestedInfo = 'خیر'
                }
                this.applicantData.push(row);
            }
        }

        this.suggestionInfo.mateUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
            this.matchmakingClothingTypes.filter(value => {
                if (value.value === item) {
                    if (this.mateWomenOfFamilyClothingTypes.length === 0) {
                        this.mateWomenOfFamilyClothingTypes = value.viewValue;
                    } else {
                        this.mateWomenOfFamilyClothingTypes += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
            this.matchmakingClothingTypes.filter(value => {
                if (value.value === item) {
                    if (this.suggestedWomenOfFamilyClothingTypes.length === 0) {
                        this.suggestedWomenOfFamilyClothingTypes = value.viewValue;
                    } else {
                        this.suggestedWomenOfFamilyClothingTypes += ` , ${value.viewValue}`
                    }
                }
            })
        });

        const womanClothingType = [
            {
                title: 'نوع پوشش خانم های  فامیل',
                mateInfo: this.mateWomenOfFamilyClothingTypes,
                suggestedInfo: this.suggestedWomenOfFamilyClothingTypes
            },
        ];

        this.applicantData = [...this.applicantData, ...womanClothingType];
    }
}
