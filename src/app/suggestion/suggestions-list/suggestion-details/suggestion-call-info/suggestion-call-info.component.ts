import {Component, Input, OnInit} from '@angular/core';
import {callInfoDictionary} from '../../../../shared/contstants/suggestion-dictionary';

@Component({
    selector: 'app-suggestion-call-info',
    templateUrl: './suggestion-call-info.component.html',
    styleUrls: ['./suggestion-call-info.component.scss']
})
export class SuggestionCallInfoComponent implements OnInit {

    @Input() suggestionInfo;

    dictionary: {} = callInfoDictionary;
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
