import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-respondent-interpret',
    templateUrl: './respondent-interpret.component.html',
    styleUrls: ['./respondent-interpret.component.scss']
})
export class RespondentInterpretComponent implements OnInit {

    EpqDisplayedColumns: string[] = ['trait', 'persianTrait', 'score', 'scoreLevelText'];
    NeoDisplayedColumns: string[] = ['trait', 'score', 'scoreLevelText'];

    EpqDataSource = new MatTableDataSource<any>();

    NArr = [];
    EArr = [];
    OArr = [];
    AArr = [];
    CArr = [];

    NDataSource = new MatTableDataSource<any>();
    EDataSource = new MatTableDataSource<any>();
    ODataSource = new MatTableDataSource<any>();
    ADataSource = new MatTableDataSource<any>();
    CDataSource = new MatTableDataSource<any>();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
    }

    ngOnInit() {

        if (this.data.testType === 'Epq') {
            this.EpqDataSource = new MatTableDataSource<any>(this.data.scores);
        }

        if (this.data.testType === 'Neo') {

            this.data.scores.forEach(item => {
                switch (item.trait[0]) {
                    case 'N':
                        this.NArr.push(item);
                        break;
                    case 'E':
                        this.EArr.push(item);
                        break;
                    case 'O':
                        this.OArr.push(item);
                        break;
                    case 'A':
                        this.AArr.push(item);
                        break;
                    case 'C':
                        this.CArr.push(item);
                        break;
                }
            });

            this.NDataSource = new MatTableDataSource<any>(this.NArr);
            this.EDataSource = new MatTableDataSource<any>(this.EArr);
            this.ODataSource = new MatTableDataSource<any>(this.OArr);
            this.ADataSource = new MatTableDataSource<any>(this.AArr);
            this.CDataSource = new MatTableDataSource<any>(this.CArr);
        }

    }
}
