import {Component, Input, OnInit} from '@angular/core';
import {hobbyInfoDictionary} from '../../../../shared/contstants/suggestion-dictionary';

@Component({
  selector: 'app-suggesstion-extra-info',
  templateUrl: './suggesstion-extra-info.component.html',
  styleUrls: ['./suggesstion-extra-info.component.scss']
})
export class SuggesstionExtraInfoComponent implements OnInit {

  @Input() suggestionInfo;

  dictionary: {} = hobbyInfoDictionary;
  applicantData = [];

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
  }
}
