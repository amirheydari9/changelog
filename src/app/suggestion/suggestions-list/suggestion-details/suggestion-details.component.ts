import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
    matchmakingSkinColors,
    matchmakingEyeColors,
    matchmakingLimbTypes,
    matchmakingEducationSections,
    matchmakingMaritalStatuses,
    matchmakingClothingTypes
} from 'app/shared/contstants/constants';

@Component({
    selector: 'app-suggestion-details',
    templateUrl: './suggestion-details.component.html',
    styleUrls: ['./suggestion-details.component.scss']
})
export class SuggestionDetailsComponent implements OnInit, OnDestroy {

    public dictionary = {};

    public applicantData = [];

    public familyRelationInformation = [];

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

    mateFatherBirthYear = '';
    mateFatherPlaceOfBirthCityName = '';
    mateFatherPlaceOfBirthProvinceName = '';
    mateFatherJobStatusText = '';
    mateFatherEducationalStageText = '';
    mateFatherMaritalStatusText = '';

    mateMotherBirthYear = '';
    mateMotherPlaceOfBirthCityName = '';
    mateMotherPlaceOfBirthProvinceName = '';
    mateMotherJobStatusText = '';
    mateMotherEducationalStageText = '';
    mateMotherMaritalStatusText = '';

    mateBrotherBirthYear = '';
    mateBrotherPlaceOfBirthCityName = '';
    mateBrotherPlaceOfBirthProvinceName = '';
    mateBrotherJobStatusText = '';
    mateBrotherEducationalStageText = '';
    mateBrotherMaritalStatusText = '';

    mateSisterBirthYear = '';
    mateSisterPlaceOfBirthCityName = '';
    mateSisterPlaceOfBirthProvinceName = '';
    mateSisterJobStatusText = '';
    mateSisterEducationalStageText = '';
    mateSisterMaritalStatusText = '';

    mateWifeBirthYear = '';
    mateWifePlaceOfBirthCityName = '';
    mateWifePlaceOfBirthProvinceName = '';
    mateWifeJobStatusText = '';
    mateWifeEducationalStageText = '';
    mateWifeMaritalStatusText = '';

    mateChildrenBirthYear = '';
    mateChildrenPlaceOfBirthCityName = '';
    mateChildrenPlaceOfBirthProvinceName = '';
    mateChildrenJobStatusText = '';
    mateChildrenEducationalStageText = '';
    mateChildrenMaritalStatusText = '';

    suggestedFatherBirthYear = '';
    suggestedFatherPlaceOfBirthCityName = '';
    suggestedFatherPlaceOfBirthProvinceName = '';
    suggestedFatherJobStatusText = '';
    suggestedFatherEducationalStageText = '';
    suggestedFatherMaritalStatusText = '';

    suggestedMotherBirthYear = '';
    suggestedMotherPlaceOfBirthCityName = '';
    suggestedMotherPlaceOfBirthProvinceName = '';
    suggestedMotherJobStatusText = '';
    suggestedMotherEducationalStageText = '';
    suggestedMotherMaritalStatusText = '';

    suggestedBrotherBirthYear = '';
    suggestedBrotherPlaceOfBirthCityName = '';
    suggestedBrotherPlaceOfBirthProvinceName = '';
    suggestedBrotherJobStatusText = '';
    suggestedBrotherEducationalStageText = '';
    suggestedBrotherMaritalStatusText = '';

    suggestedSisterBirthYear = '';
    suggestedSisterPlaceOfBirthCityName = '';
    suggestedSisterPlaceOfBirthProvinceName = '';
    suggestedSisterJobStatusText = '';
    suggestedSisterEducationalStageText = '';
    suggestedSisterMaritalStatusText = '';

    suggestedWifeBirthYear = '';
    suggestedWifePlaceOfBirthCityName = '';
    suggestedWifePlaceOfBirthProvinceName = '';
    suggestedWifeJobStatusText = '';
    suggestedWifeEducationalStageText = '';
    suggestedWifeMaritalStatusText = '';

    suggestedChildrenBirthYear = '';
    suggestedChildrenPlaceOfBirthCityName = '';
    suggestedChildrenPlaceOfBirthProvinceName = '';
    suggestedChildrenJobStatusText = '';
    suggestedChildrenEducationalStageText = '';
    suggestedChildrenMaritalStatusText = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }


    ngOnInit() {

        document.getElementById('defaultOpen').click();

        this.dictionary = {
            mobile: 'شماره موبایل',
            nationalID: 'کدملی',
            birthday: 'تاریخ تولد',
            genderText: 'جنسیت',
            religionText: 'مذهب/دین',
            religionDescription: 'توضیحات مذهبی',
            originality: 'اصلیت',
            email: 'پست الکترونیک',
            address: 'آدرس',
            seminaryEducationLevelText: 'سطح حوزوی',
            turbanWearingStatusText: 'وضعیت تعمم',
            educationStatusText: 'تحصیلات',
            educationalStageText: 'مدرک تحصیلی',
            fieldOfStudy: 'رشته تحصیلی',
            universityOrSchoolTypeText: 'نوع دانشگاه / مدرسه محل تحصیل',
            universityOrSchoolName: 'نام دانشگاه / مدرسه محل تحصیل',
            educationProfileDescription: 'توضیحات پروفایل آموزشی',
            jobStatusText: 'وضعیت اشتغال',
            contractTypeText: 'نوع قرارداد',
            workplaceName: 'محل اشتغال',
            jobTitle: 'عنوان شغل',
            jobDescription: 'توضیحات شغل',
            height: 'قد',
            weight: 'وزن',
            skinColorText: 'رنگ پوست',
            eyeColorText: 'رنگ چشم',
            bodyWeightCategoryText: 'تناسب اندام',
            clothingTypeText: 'نوع پوشش',
            womenOfFamilyClothingTypeText: 'نوع پوشش خانم های فامیل',
            conscriptionStatusText: 'وضعیت نظام وظیفه',
            hasSpecificDisease: 'بیماری خاص دارد',
            specificDiseaseName: 'نام بیماری خاص',
            hasDisability: 'معلولیت دارد',
            disabilityName: 'نام معلولیت',
            appearanceInformationDescription: 'مشخصات ظاهری',
            familySocioeconomicStatusText: 'وضعیت اقتصادی خانواده',
            familyHomeOwnershipStatusText: 'وضعیت مالکیت خانه خانواده',
            familySocioeconomicDescription: 'توضیحات شرایط اقتصادی خانواده',
            hasAPrivateHouse: 'خانه شخصی دارد',
            wealthText: 'پس انداز',
            monthlyAverageIncomeText: 'متوسط درآمد ماهانه',
            economicsDescription: 'توضیحات اقتصادی',
            scientificSkills: 'مهارت های علمی',
            artisticSkills: 'مهارت های هنری',
            technicalSkills: 'مهارت های فنی',
            athleticSkills: 'مهارت های ورزشی',
            interestsAndHobbies: 'علاقمندی ها و سرگرمی ها',
            birthOrder: 'فرزند چندم خانواده',
            familyMembersDescription: 'توضیحات در مورد اعضا خانواده',
            religiousPracticeText: 'تقید مذهبی',
            smoking: 'سیگاری',
            listeningToMusicStatusText: 'علاقمند به گوش دادن موسیقی',
            livingAbroadTendencyText: 'وضعیت تمایل به زندگی در خارج از کشور',
            maritalStatusText: 'وضعیت تاهل',
            livingTogetherDurationText: 'مدت زمان زندگی مشترک',
            childrenCount: 'تعداد فرزند',
            supplementaryDescription: 'توضیحات تکمیلی ',
            matchmakingAcceptChildrenOfPartner: 'فرزند طرف مقابل می پذیرم',
            matchmakingDescription: 'توضیحات تکمیلی خواسته ها',
            placeOfResidenceCityName: 'شهر محل سکونت',
            placeOfResidenceProvinceName: 'استان محل سکونت',
            placeOfBirthProvinceName: 'استان محل تولد',
            placeOfBirthCityName: 'شهر محل تولد',
            aboutMe: 'درباره من',
        };

        for (const key in this.dictionary) {
            const row = {
                title: this.dictionary[key],
                mateInfo: this.data.mateUserInfo.applicant[key] ? this.data.mateUserInfo.applicant[key] : '-',
                suggestedInfo: this.data.suggestedUserInfo.applicant[key] ? this.data.suggestedUserInfo.applicant[key] : '-'
            };
            if (row.title) {
                this.applicantData.push(row);
            }
        }

        const likes = [
            {
                title: 'قد دلخواه همسر مورد نظر',
                mateInfo: this.data.mateUserInfo.applicant.matchmakingMinimumHeight + ' بین ' + this.data.mateUserInfo.applicant.matchmakingMaximumHeight,
                suggestedInfo: this.data.suggestedUserInfo.applicant.matchmakingMinimumHeight + ' بین ' + this.data.suggestedUserInfo.applicant.matchmakingMaximumHeight
            },
            {
                title: 'وزن دلخواه همسر مورد نظر',
                mateInfo: this.data.mateUserInfo.applicant.matchmakingMinimumWeight + ' بین ' + this.data.mateUserInfo.applicant.matchmakingMaximumWeight,
                suggestedInfo: this.data.suggestedUserInfo.applicant.matchmakingMinimumWeight + ' بین ' + this.data.suggestedUserInfo.applicant.matchmakingMaximumWeight
            },
            {
                title: 'سن دلخواه همسر مورد نظر',
                mateInfo: this.data.mateUserInfo.applicant.matchmakingMinimumBirthYear + ' بین ' + this.data.mateUserInfo.applicant.matchmakingMaximumBirthYear,
                suggestedInfo: this.data.suggestedUserInfo.applicant.matchmakingMinimumBirthYear + ' بین ' + this.data.suggestedUserInfo.applicant.matchmakingMaximumBirthYear
            }
        ];

        this.data.mateUserInfo.applicant.matchmakingSkinColors.forEach(item => {

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

        this.data.suggestedUserInfo.applicant.matchmakingSkinColors.forEach(item => {

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

        this.data.mateUserInfo.applicant.matchmakingEyeColors.forEach(item => {
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

        this.data.suggestedUserInfo.applicant.matchmakingEyeColors.forEach(item => {
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

        this.data.mateUserInfo.applicant.matchmakingBodyWeightCategories.forEach(item => {
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

        this.data.suggestedUserInfo.applicant.matchmakingBodyWeightCategories.forEach(item => {
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

        this.data.mateUserInfo.applicant.matchmakingEducationalStages.forEach(item => {
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

        this.data.suggestedUserInfo.applicant.matchmakingEducationalStages.forEach(item => {
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

        this.data.mateUserInfo.applicant.matchmakingMaritalStatuses.forEach(item => {
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

        this.data.suggestedUserInfo.applicant.matchmakingMaritalStatuses.forEach(item => {
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

        this.data.mateUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
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

        this.data.suggestedUserInfo.applicant.matchmakingClothingTypes.forEach(item => {
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

        this.applicantData = [...this.applicantData, ...likes, ...matchMaking];

        this.data.mateUserInfo.familyRelations.forEach(item => {
            if (item.familyRelationship == 1) {
                this.mateFatherBirthYear = item.birthYear;
                this.mateFatherPlaceOfBirthProvinceName = item.PlaceOfBirthProvinceName;
                this.mateFatherPlaceOfBirthCityName = item.PlaceOfBirthCityName;
                this.mateFatherJobStatusText = item.JobStatusText;
                this.mateFatherEducationalStageText = item.EducationalStageText;
                this.mateFatherMaritalStatusText = item.MaritalStatusText;
            }
            if (item.familyRelationship == 2) {
                this.mateMotherBirthYear = item.birthYear;
                this.mateMotherPlaceOfBirthProvinceName = item.PlaceOfBirthProvinceName;
                this.mateMotherPlaceOfBirthCityName = item.PlaceOfBirthCityName;
                this.mateMotherJobStatusText = item.JobStatusText;
                this.mateMotherEducationalStageText = item.EducationalStageText;
                this.mateMotherMaritalStatusText = item.MaritalStatusText;
            }
            if (item.familyRelationship == 3) {
                if (!this.mateBrotherBirthYear) {
                    this.mateBrotherBirthYear = item.birthYear;
                } else {
                    this.mateBrotherBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.mateBrotherPlaceOfBirthProvinceName) {
                    this.mateBrotherPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.mateBrotherPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.mateBrotherPlaceOfBirthCityName) {
                    this.mateBrotherPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.mateBrotherPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.mateBrotherJobStatusText) {
                    this.mateBrotherJobStatusText = item.JobStatusText;
                } else {
                    this.mateBrotherJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.mateBrotherEducationalStageText) {
                    this.mateBrotherEducationalStageText = item.EducationalStageText;
                } else {
                    this.mateBrotherEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.mateBrotherMaritalStatusText) {
                    this.mateBrotherMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.mateBrotherMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 4) {
                if (!this.mateSisterBirthYear) {
                    this.mateSisterBirthYear = item.birthYear;
                } else {
                    this.mateSisterBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.mateSisterPlaceOfBirthProvinceName) {
                    this.mateSisterPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.mateSisterPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.mateSisterPlaceOfBirthCityName) {
                    this.mateSisterPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.mateSisterPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.mateSisterJobStatusText) {
                    this.mateSisterJobStatusText = item.JobStatusText;
                } else {
                    this.mateSisterJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.mateSisterEducationalStageText) {
                    this.mateSisterEducationalStageText = item.EducationalStageText;
                } else {
                    this.mateSisterEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.mateSisterMaritalStatusText) {
                    this.mateSisterMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.mateSisterMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 5) {
                if (!this.mateWifeBirthYear) {
                    this.mateWifeBirthYear = item.birthYear;
                } else {
                    this.mateWifeBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.mateWifePlaceOfBirthProvinceName) {
                    this.mateWifePlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.mateWifePlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.mateWifePlaceOfBirthCityName) {
                    this.mateWifePlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.mateWifePlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.mateWifeJobStatusText) {
                    this.mateWifeJobStatusText = item.JobStatusText;
                } else {
                    this.mateWifeJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.mateWifeEducationalStageText) {
                    this.mateWifeEducationalStageText = item.EducationalStageText;
                } else {
                    this.mateWifeEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.mateWifeMaritalStatusText) {
                    this.mateWifeMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.mateWifeMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 6) {
                if (!this.mateChildrenBirthYear) {
                    this.mateChildrenBirthYear = item.birthYear;
                } else {
                    this.mateChildrenBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.mateChildrenPlaceOfBirthProvinceName) {
                    this.mateChildrenPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.mateChildrenPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.mateChildrenPlaceOfBirthCityName) {
                    this.mateChildrenPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.mateChildrenPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.mateChildrenJobStatusText) {
                    this.mateChildrenJobStatusText = item.JobStatusText;
                } else {
                    this.mateChildrenJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.mateChildrenEducationalStageText) {
                    this.mateChildrenEducationalStageText = item.EducationalStageText;
                } else {
                    this.mateChildrenEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.mateChildrenMaritalStatusText) {
                    this.mateChildrenMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.mateChildrenMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
        })

        this.data.suggestedUserInfo.familyRelations.forEach(item => {
            if (item.familyRelationship == 1) {
                this.suggestedFatherBirthYear = item.birthYear;
                this.suggestedFatherPlaceOfBirthProvinceName = item.PlaceOfBirthProvinceName;
                this.suggestedFatherPlaceOfBirthCityName = item.PlaceOfBirthCityName;
                this.suggestedFatherJobStatusText = item.JobStatusText;
                this.suggestedFatherEducationalStageText = item.EducationalStageText;
                this.suggestedFatherMaritalStatusText = item.MaritalStatusText;
            }
            if (item.familyRelationship == 2) {
                this.suggestedMotherBirthYear = item.birthYear;
                this.suggestedMotherPlaceOfBirthProvinceName = item.PlaceOfBirthProvinceName;
                this.suggestedMotherPlaceOfBirthCityName = item.PlaceOfBirthCityName;
                this.suggestedMotherJobStatusText = item.JobStatusText;
                this.suggestedMotherEducationalStageText = item.EducationalStageText;
                this.suggestedMotherMaritalStatusText = item.MaritalStatusText;
            }
            if (item.familyRelationship == 3) {
                if (!this.suggestedBrotherBirthYear) {
                    this.suggestedBrotherBirthYear = item.birthYear;
                } else {
                    this.suggestedBrotherBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.suggestedBrotherPlaceOfBirthProvinceName) {
                    this.suggestedBrotherPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.suggestedBrotherPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.suggestedBrotherPlaceOfBirthCityName) {
                    this.suggestedBrotherPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.suggestedBrotherPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.suggestedBrotherJobStatusText) {
                    this.suggestedBrotherJobStatusText = item.JobStatusText;
                } else {
                    this.suggestedBrotherJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.suggestedBrotherEducationalStageText) {
                    this.suggestedBrotherEducationalStageText = item.EducationalStageText;
                } else {
                    this.suggestedBrotherEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.suggestedBrotherMaritalStatusText) {
                    this.suggestedBrotherMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.suggestedBrotherMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 4) {
                if (!this.suggestedSisterBirthYear) {
                    this.suggestedSisterBirthYear = item.birthYear;
                } else {
                    this.suggestedSisterBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.suggestedSisterPlaceOfBirthProvinceName) {
                    this.suggestedSisterPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.suggestedSisterPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.suggestedSisterPlaceOfBirthCityName) {
                    this.suggestedSisterPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.suggestedSisterPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.suggestedSisterJobStatusText) {
                    this.suggestedSisterJobStatusText = item.JobStatusText;
                } else {
                    this.suggestedSisterJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.suggestedSisterEducationalStageText) {
                    this.suggestedSisterEducationalStageText = item.EducationalStageText;
                } else {
                    this.suggestedSisterEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.suggestedSisterMaritalStatusText) {
                    this.suggestedSisterMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.suggestedSisterMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 5) {
                if (!this.suggestedWifeBirthYear) {
                    this.suggestedWifeBirthYear = item.birthYear;
                } else {
                    this.suggestedWifeBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.suggestedWifePlaceOfBirthProvinceName) {
                    this.suggestedWifePlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.suggestedWifePlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.suggestedWifePlaceOfBirthCityName) {
                    this.suggestedWifePlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.suggestedWifePlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.suggestedWifeJobStatusText) {
                    this.suggestedWifeJobStatusText = item.JobStatusText;
                } else {
                    this.suggestedWifeJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.suggestedWifeEducationalStageText) {
                    this.suggestedWifeEducationalStageText = item.EducationalStageText;
                } else {
                    this.suggestedWifeEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.suggestedWifeMaritalStatusText) {
                    this.suggestedWifeMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.suggestedWifeMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
            if (item.familyRelationship == 6) {
                if (!this.suggestedChildrenBirthYear) {
                    this.suggestedChildrenBirthYear = item.birthYear;
                } else {
                    this.suggestedChildrenBirthYear += ` , ${item.birthYear} `;
                }
                if (!this.suggestedChildrenPlaceOfBirthProvinceName) {
                    this.suggestedChildrenPlaceOfBirthProvinceName = item.placeOfBirthProvinceName;
                } else {
                    this.suggestedChildrenPlaceOfBirthProvinceName += ` , ${item.placeOfBirthProvinceName} `;
                }
                if (!this.suggestedChildrenPlaceOfBirthCityName) {
                    this.suggestedChildrenPlaceOfBirthCityName = item.placeOfBirthCityName;
                } else {
                    this.suggestedChildrenPlaceOfBirthCityName += ` , ${item.placeOfBirthCityName} `;
                }
                if (!this.suggestedChildrenJobStatusText) {
                    this.suggestedChildrenJobStatusText = item.JobStatusText;
                } else {
                    this.suggestedChildrenJobStatusText += ` , ${item.JobStatusText} `;
                }
                if (!this.suggestedChildrenEducationalStageText) {
                    this.suggestedChildrenEducationalStageText = item.EducationalStageText;
                } else {
                    this.suggestedChildrenEducationalStageText += ` , ${item.EducationalStageText} `;
                }
                if (!this.suggestedChildrenMaritalStatusText) {
                    this.suggestedChildrenMaritalStatusText = item.MaritalStatusText;
                } else {
                    this.suggestedChildrenMaritalStatusText += ` , ${item.MaritalStatusText} `;
                }
            }
        })
    }

    openContent($event: any, tabName: string) {
        let i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('tabcontent');
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }
        document.getElementById(tabName).style.display = 'block';
        $event.currentTarget.className += ' active';
    }

    ngOnDestroy(): void {

        console.log('bye')
    }


}
