import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {suggestionDictionary} from '../../../../shared/contstants/suggestion-dictionary';

@Component({
  selector: 'app-suggesstion-family-info',
  templateUrl: './suggesstion-family-info.component.html',
  styleUrls: ['./suggesstion-family-info.component.scss']
})
export class SuggesstionFamilyInfoComponent implements OnInit {
  @Input() suggestionInfo;

  dictionary: {} = suggestionDictionary;
  applicantData = [];

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

    this.suggestionInfo.mateUserInfo.familyRelations.forEach(item => {
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

    this.suggestionInfo.suggestedUserInfo.familyRelations.forEach(item => {
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

}
