import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    constructor(private ngxUiLoaderService: NgxUiLoaderService) {
    }

    ngOnInit() {

        this.ngxUiLoaderService.stop();
    }

}
