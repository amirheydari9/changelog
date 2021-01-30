import {Component, Input, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-suggestion-respondent-info',
    templateUrl: './suggestion-respondent-info.component.html',
    styleUrls: ['./suggestion-respondent-info.component.scss']
})
export class SuggestionRespondentInfoComponent implements OnInit {

    @Input() suggestionInfo;

    mateEpqResult;
    suggestedEpqResult;

    mateNeoResult;
    suggestedNeoResult;

    displayColumnName: string[] = ['trait', 'persianTrait', 'score', 'scoreLevelText'];
    NeoDisplayColumnName: string[] = ['trait', 'score', 'scoreLevelText'];
    mateEpqResultDataSource = new MatTableDataSource<any>();
    suggestedEpqResultDataSource = new MatTableDataSource<any>();

    mateNArr = [];
    mateEArr = [];
    mateOArr = [];
    mateAArr = [];
    mateCArr = [];

    suggestedNArr = [];
    suggestedEArr = [];
    suggestedOArr = [];
    suggestedAArr = [];
    suggestedCArr = [];

    mateNDataSource = new MatTableDataSource<any>();
    mateEDataSource = new MatTableDataSource<any>();
    mateODataSource = new MatTableDataSource<any>();
    mateADataSource = new MatTableDataSource<any>();
    mateCDataSource = new MatTableDataSource<any>();

    suggestedNDataSource = new MatTableDataSource<any>();
    suggestedEDataSource = new MatTableDataSource<any>();
    suggestedODataSource = new MatTableDataSource<any>();
    suggestedADataSource = new MatTableDataSource<any>();
    suggestedCDataSource = new MatTableDataSource<any>();

    constructor() {
    }

    ngOnInit() {
        console.log(this.suggestionInfo);

        this.suggestionInfo.mateUserInfo.personalityTests.forEach(item => {
            if (item.testType === 'Epq') {
                this.mateEpqResult = item;
            }
            if (item.testType === 'Neo') {
                this.mateNeoResult = item;
            }
        });
        this.suggestionInfo.suggestedUserInfo.personalityTests.forEach(item => {
            if (item.testType === 'Epq') {
                this.suggestedEpqResult = item;
            }
            if (item.testType === 'Neo') {
                this.suggestedNeoResult = item;
            }
        });

        this.mateEpqResultDataSource = new MatTableDataSource<any>(this.mateEpqResult.scores);
        this.mateEpqResultDataSource = new MatTableDataSource<any>(this.mateEpqResult.scores);

        if (this.mateNeoResult) {

            this.mateNeoResult.scores.forEach(item => {
                switch (item.trait[0]) {
                    case 'N':
                        this.mateNArr.push(item);
                        break;
                    case 'E':
                        this.mateEArr.push(item);
                        break;
                    case 'O':
                        this.mateOArr.push(item);
                        break;
                    case 'A':
                        this.mateAArr.push(item);
                        break;
                    case 'C':
                        this.mateCArr.push(item);
                        break;
                }
            });

            this.mateNDataSource = new MatTableDataSource<any>(this.mateNArr);
            this.mateEDataSource = new MatTableDataSource<any>(this.mateEArr);
            this.mateODataSource = new MatTableDataSource<any>(this.mateOArr);
            this.mateADataSource = new MatTableDataSource<any>(this.mateAArr);
            this.mateCDataSource = new MatTableDataSource<any>(this.mateCArr);
        }

        if (this.suggestedNeoResult) {

            this.suggestedNeoResult.scores.forEach(item => {
                switch (item.trait[0]) {
                    case 'N':
                        this.suggestedNArr.push(item);
                        break;
                    case 'E':
                        this.suggestedEArr.push(item);
                        break;
                    case 'O':
                        this.suggestedOArr.push(item);
                        break;
                    case 'A':
                        this.suggestedAArr.push(item);
                        break;
                    case 'C':
                        this.suggestedCArr.push(item);
                        break;
                }
            });

            this.suggestedNDataSource = new MatTableDataSource<any>(this.suggestedNArr);
            this.suggestedEDataSource = new MatTableDataSource<any>(this.suggestedEArr);
            this.suggestedODataSource = new MatTableDataSource<any>(this.suggestedOArr);
            this.suggestedADataSource = new MatTableDataSource<any>(this.suggestedAArr);
            this.suggestedCDataSource = new MatTableDataSource<any>(this.suggestedCArr);
        }
    }
}
