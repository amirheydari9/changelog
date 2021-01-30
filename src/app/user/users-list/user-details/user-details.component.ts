import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {UsersListService} from '../../../services/user/users-list.service';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

    error = false;
    userInfo;
    TebyanAdmin = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private usersListService: UsersListService,
        private alertService: ToastrService,
        private authService: AuthService
    ) {

    }

    ngOnInit() {

        this.authService.getBehaviourUserInfo().subscribe(
            (data) => {
                data.roles.forEach(role => {
                    if (role === 'TebyanAdmin') {
                        this.TebyanAdmin = true;
                    }
                })
            }
        );

        document.getElementById('defaultOpen').click();

        if (this.data.applicant.state == 2 || this.data.applicant.state == 4 || this.data.applicant.state == 7 || this.data.applicant.state == 8) {
            this.alertService.info('کاربر مورد نظر قبلا تایید شده است');
            return;
        }

        if ((this.data.applicant.state !== 1 && this.data.applicant.state !== 3 && this.data.applicant.state !== 5) || (!this.data.completeness.isCompleted)) {
            this.alertService.warning('امکان تایید کاربر مورد نظر وجود ندارد');
            return;
        }
    }

    openContent($event: any, tabName: string) {
        if (this.error) {
            this.alertService.error('محتوای این تب را به درستی وارد نمایید');
            return;
        } else {
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
    }

    verifyUser() {

        this.usersListService.verifyUser(this.data.applicant.id).subscribe(
            (data) => {
                this.alertService.success('عملیات با موفقیت انجام شد')
            }, error => this.alertService.error(error)
        )
    }

    editUser() {
        if (this.error) {
            this.alertService.error('اطلاعات را به درستی وارد نمایید');
            return;
        }
        if (this.userInfo['religion'] != 1 && this.userInfo['religion'] != 2) {
            delete this.userInfo['seminaryEducationLevel']
        }
        if (this.userInfo['gender'] != 1) {
            delete this.userInfo['turbanWearingStatus']
        }
        if (+this.userInfo.maritalStatus < 3) {
            delete this.userInfo['livingTogetherDuration'];
            delete this.userInfo['childrenCount'];
        }
        if (+this.userInfo.jobStatus < 3) {
            delete this.userInfo['contractType'];
            delete this.userInfo['workplaceName'];
            delete this.userInfo['jobTitle'];
        }
        this.usersListService.editUser(this.data.applicant.id, this.userInfo).subscribe(
            () => this.alertService.success('عملیات با موفقیت انجام شد'),
            error => this.alertService.error('عملیات انجام نشد')
        )
    }

    formHasError($event: boolean) {
        this.error = $event;
    }

    userInfoChanged($event: any) {
        this.userInfo = {...this.data.applicant, ...this.userInfo, ...$event};
        this.data.applicant = {...this.data.applicant, ...this.userInfo, ...$event};
        console.log(this.userInfo);
    }
}
