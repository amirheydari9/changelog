import {Component, Input, OnInit} from '@angular/core';

import {
    matchmakingClothingTypes,
    matchmakingEducationSections,
    matchmakingEyeColors,
    matchmakingLimbTypes,
    matchmakingMaritalStatuses,
    matchmakingSkinColors
} from 'app/shared/contstants/constants';
import {matchMakingInfoDictionary} from '../../../../shared/contstants/suggestion-dictionary';

@Component({
    selector: 'app-suggesstion-likes',
    templateUrl: './suggesstion-likes.component.html',
    styleUrls: ['./suggesstion-likes.component.scss']
})
export class SuggesstionLikesComponent implements OnInit {

    @Input() suggestionInfo;
    dictionary: {} = matchMakingInfoDictionary;

    applicantData = [];

    matchmakingSkinColors = matchmakingSkinColors;
    matchmakingEyeColors = matchmakingEyeColors;
    matchmakingBodyWeightCategories = matchmakingLimbTypes;
    matchmakingEducationSections = matchmakingEducationSections;
    matchmakingMaritalStatuses = matchmakingMaritalStatuses;
    matchmakingClothingTypes = matchmakingClothingTypes;

    mateMatchMakingSkinColorText = '';
    mateMatchMakingEyeColorText = '';
    mateMatchMakingBodyWeightCategoryText = '';
    mateMatchMakingEducationalStageText = '';
    mateMatchMakingMartialStatusText = '';
    mateMatchMakingClothingTypeText = '';

    suggestedMatchMakingSkinColorText = '';
    suggestedMatchMakingEyeColorText = '';
    suggestedMatchMakingBodyWeightCategoryText = '';
    suggestedMatchMakingEducationalStageText = '';
    suggestedMatchMakingMartialStatusText = '';
    suggestedMatchMakingClothingTypeText = '';

    constructor() {
    }

    ngOnInit() {

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
        const likes = [
            {
                title: 'قد دلخواه همسر مورد نظر',
                mateInfo: this.suggestionInfo.mateUserInfo.applicant.matchmakingMinimumHeight + '-' + this.suggestionInfo.mateUserInfo.applicant.matchmakingMaximumHeight,
                suggestedInfo: this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMinimumHeight + '-' + +this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMaximumHeight
            },
            {
                title: 'وزن دلخواه همسر مورد نظر',
                mateInfo: this.suggestionInfo.mateUserInfo.applicant.matchmakingMinimumWeight + '-' + this.suggestionInfo.mateUserInfo.applicant.matchmakingMaximumWeight,
                suggestedInfo: this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMinimumWeight + '-' + this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMaximumWeight,
            },
            {
                title: 'سن دلخواه همسر مورد نظر',
                mateInfo: this.suggestionInfo.mateUserInfo.applicant.matchmakingMinimumBirthYear + '-' + this.suggestionInfo.mateUserInfo.applicant.matchmakingMaximumBirthYear,
                suggestedInfo: this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMinimumBirthYear + '-' + this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMaximumBirthYear,
            }
        ];

        this.suggestionInfo.mateUserInfo.applicant.matchmakingSkinColors.forEach(item => {

            this.matchmakingSkinColors.filter(value => {

                if (value.value === item) {
                    if (this.mateMatchMakingSkinColorText.length === 0) {
                        this.mateMatchMakingSkinColorText = value.viewValue;
                    } else {
                        this.mateMatchMakingSkinColorText += ` , ${value.viewValue}`
                    }
                }
            })

        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingSkinColors.forEach(item => {

            this.matchmakingSkinColors.filter(value => {

                if (value.value === item) {
                    if (this.suggestedMatchMakingSkinColorText.length === 0) {
                        this.suggestedMatchMakingSkinColorText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingSkinColorText += ` , ${value.viewValue} `
                    }
                }
            })

        });

        this.suggestionInfo.mateUserInfo.applicant.matchmakingEyeColors.forEach(item => {
            this.matchmakingEyeColors.filter(value => {
                if (value.value === item) {
                    if (this.mateMatchMakingEyeColorText.length === 0) {
                        this.mateMatchMakingEyeColorText = value.viewValue;
                    } else {
                        this.mateMatchMakingEyeColorText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingEyeColors.forEach(item => {
            this.matchmakingEyeColors.filter(value => {
                if (value.value === item) {
                    if (this.suggestedMatchMakingEyeColorText.length === 0) {
                        this.suggestedMatchMakingEyeColorText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingEyeColorText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.mateUserInfo.applicant.matchmakingBodyWeightCategories.forEach(item => {
            this.matchmakingBodyWeightCategories.filter(value => {
                if (value.value === item) {
                    if (this.mateMatchMakingBodyWeightCategoryText.length === 0) {
                        this.mateMatchMakingBodyWeightCategoryText = value.viewValue;
                    } else {
                        this.mateMatchMakingBodyWeightCategoryText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingBodyWeightCategories.forEach(item => {
            this.matchmakingBodyWeightCategories.filter(value => {
                if (value.value === item) {
                    if (this.suggestedMatchMakingBodyWeightCategoryText.length === 0) {
                        this.suggestedMatchMakingBodyWeightCategoryText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingBodyWeightCategoryText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.mateUserInfo.applicant.matchmakingEducationalStages.forEach(item => {
            this.matchmakingEducationSections.filter(value => {
                if (value.value === item) {
                    if (this.mateMatchMakingEducationalStageText.length === 0) {
                        this.mateMatchMakingEducationalStageText = value.viewValue;
                    } else {
                        this.mateMatchMakingEducationalStageText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingEducationalStages.forEach(item => {
            this.matchmakingEducationSections.filter(value => {
                if (value.value === item) {
                    if (this.suggestedMatchMakingEducationalStageText.length === 0) {
                        this.suggestedMatchMakingEducationalStageText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingEducationalStageText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.mateUserInfo.applicant.matchmakingMaritalStatuses.forEach(item => {
            this.matchmakingMaritalStatuses.filter(value => {
                if (value.value === item) {
                    if (this.mateMatchMakingMartialStatusText.length === 0) {
                        this.mateMatchMakingMartialStatusText = value.viewValue;
                    } else {
                        this.mateMatchMakingMartialStatusText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingMaritalStatuses.forEach(item => {
            this.matchmakingMaritalStatuses.filter(value => {
                if (value.value === item) {
                    if (this.suggestedMatchMakingMartialStatusText.length === 0) {
                        this.suggestedMatchMakingMartialStatusText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingMartialStatusText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.mateUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
            this.matchmakingClothingTypes.filter(value => {
                if (value.value === item) {
                    if (this.mateMatchMakingClothingTypeText.length === 0) {
                        this.mateMatchMakingClothingTypeText = value.viewValue;
                    } else {
                        this.mateMatchMakingClothingTypeText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        this.suggestionInfo.suggestedUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
            this.matchmakingClothingTypes.filter(value => {
                if (value.value === item) {
                    if (this.suggestedMatchMakingClothingTypeText.length === 0) {
                        this.suggestedMatchMakingClothingTypeText = value.viewValue;
                    } else {
                        this.suggestedMatchMakingClothingTypeText += ` , ${value.viewValue}`
                    }
                }
            })
        });

        const matchMaking = [
            {
                title: 'رنگ پوست دلخواه همسر مورد نظر',
                mateInfo: this.mateMatchMakingSkinColorText,
                suggestedInfo: this.suggestedMatchMakingSkinColorText
            },
            {
                title: 'رنگ چشم دلخواه همسر مورد نظر',
                mateInfo: this.mateMatchMakingEyeColorText,
                suggestedInfo: this.suggestedMatchMakingEyeColorText
            },
            {
                title: 'تناسب اندام دلخواه همسر مورد نظر',
                mateInfo: this.mateMatchMakingBodyWeightCategoryText,
                suggestedInfo: this.suggestedMatchMakingBodyWeightCategoryText
            },
            {
                title: 'تحصیلات دلخواه همسر مورد نظر',
                mateInfo: this.mateMatchMakingEducationalStageText,
                suggestedInfo: this.suggestedMatchMakingEducationalStageText
            },
            {
                title: 'وضعیت تاهل همسر مورد نظر',
                mateInfo: this.mateMatchMakingMartialStatusText,
                suggestedInfo: this.suggestedMatchMakingMartialStatusText
            },
            {
                title: 'نوع پوشش همسر مورد نظر',
                mateInfo: this.mateMatchMakingClothingTypeText,
                suggestedInfo: this.suggestedMatchMakingClothingTypeText
            },
        ];

        this.applicantData = [...likes, ...matchMaking, ...this.applicantData,];
    }


}
