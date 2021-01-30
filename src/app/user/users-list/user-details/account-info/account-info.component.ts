import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'jalali-moment';
import {takeUntil} from 'rxjs/operators';
import {CommonService} from '../../../../services/common/common.service';
import {ReplaySubject, Subject} from 'rxjs';
import {ICity} from '../../../../DTO/common/ICity';
import {AgentService} from '../../../../services/agent/agent.service';
import {religionTypes} from '../../../../shared/contstants/constants';
import {validMobile, validNationalId} from '../../../../shared/Rules/Rules';
import {UsersListService} from '../../../../services/user/users-list.service';

@Component({
    selector: 'app-account-info',
    templateUrl: './account-info.component.html',
    styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit, OnDestroy {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();
    accountInfoForm: FormGroup;

    cities;
    provinces;
    city;
    province;
    groups;
    group;

    religionTypes = religionTypes;

    public filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredProvinces: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredGroups: ReplaySubject<any> = new ReplaySubject<any>(1);

    protected _onDestroy = new Subject<void>();

    constructor(
        private commonService: CommonService,
        private agentService: AgentService,
        private userService: UsersListService
    ) {
    }

    ngOnInit() {

        //TODO وقتی ایجنت ها رو عوض میکنه گروه ها هم باید عوض شه و بر عکس

        this.commonService.getBehaviourProvinces().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.provinces = data;
                    this.filteredProvinces.next(this.provinces.slice());
                    this.province = this.provinces.filter(province => province.id === this.userData.applicant.placeOfBirthProvinceId)[0];
                }
            }
        );

        this.commonService.getBehaviourCities().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.cities = data;
                    this.filteredCities.next(this.cities.slice());
                    this.city = this.cities.filter(city => city.id === this.userData.applicant.placeOfBirthCityId)[0];
                }
            }
        );

        this.agentService.getBehaviourAgentGroups().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.groups = data;
                    this.filteredGroups.next(this.groups.slice());
                    this.group = this.groups.filter(group => group.id === this.userData.applicant.groupId)[0];
                }
            }
        );

        this.initForm();
        this.accountInfoForm.controls.shortCode.disable();
        this.accountInfoForm.controls.gender.disable();
        // this.accountInfoForm.controls.mobile.disable();
        if (!this.isTebyanAdmin) {
            this.accountInfoForm.disable();
        }

        this.accountInfoForm.controls.cityFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCities();
            });

        this.accountInfoForm.controls.provinceFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterProvinces();
            });

        this.accountInfoForm.controls.groupFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterGroups();
            });

        this.accountInfoForm.controls.religion.valueChanges.subscribe(
            (data) => this.userService.religion.next(data)
        );

        this.accountInfoForm.valueChanges.subscribe(() => {
            if (this.accountInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.accountInfoForm.valid) {
                this.formHasError.emit(false);
                this.userInfoChanged.emit({
                    firstname: this.accountInfoForm.controls.firstname.value,
                    lastname: this.accountInfoForm.controls.lastname.value,
                    firstnameProfileVisibility: this.accountInfoForm.controls.firstnameProfileVisibility.value,
                    nationalID: this.accountInfoForm.controls.nationalID.value,
                    birthday: moment(this.accountInfoForm.controls.birthday.value, 'fa').format('jYYYY/jMM/jDD'),
                    religion: this.accountInfoForm.controls.religion.value,
                    religionDescription: this.accountInfoForm.controls.religionDescription.value,
                    placeOfBirthCityId: this.accountInfoForm.controls.placeOfBirthCityId.value ? this.accountInfoForm.controls.placeOfBirthCityId.value.id : null,
                    // originality: this.accountInfoForm.controls.originality.value,
                    groupId: this.accountInfoForm.controls.groupId.value.id,
                });
            }
        });
    }

    initForm() {
        this.accountInfoForm = new FormGroup({
            shortCode: new FormControl(this.userData.applicant.shortCode),
            firstname: new FormControl(this.userData.applicant.firstname, [Validators.required]),
            firstnameProfileVisibility: new FormControl(this.userData.applicant.firstnameProfileVisibility),
            lastname: new FormControl(this.userData.applicant.lastname, [Validators.required]),
            gender: new FormControl(this.userData.applicant.genderText),
            birthday: new FormControl(moment.from(this.userData.applicant.birthday, 'fa')),
            nationalID: new FormControl(this.userData.applicant.nationalID, [Validators.required, validNationalId]),
            // mobile: new FormControl(this.userData.applicant.mobile, [Validators.required, validMobile]),
            // originality: new FormControl(this.userData.applicant.originality),
            placeOfBirthProvinceId: new FormControl(this.province),
            placeOfBirthCityId: new FormControl(this.city),
            religion: new FormControl(this.userData.applicant.religion),
            religionDescription: new FormControl(this.userData.applicant.religionDescription),
            groupId: new FormControl(this.group),
            cityFilterCtrl: new FormControl(),
            provinceFilterCtrl: new FormControl(),
            groupFilterCtrl: new FormControl(),
        })
    }

    protected filterCities() {
        if (!this.cities) {
            return;
        }
        let search = this.accountInfoForm.controls.cityFilterCtrl.value;
        if (!search) {
            this.filteredCities.next(this.cities.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredCities.next(
            this.cities.filter(city => city.name.toLowerCase().indexOf(search) > -1)
        );
    }

    protected filterProvinces() {
        if (!this.provinces) {
            return;
        }
        let search = this.accountInfoForm.controls.provinceFilterCtrl.value;
        if (!search) {
            this.filteredProvinces.next(this.provinces.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredProvinces.next(
            this.provinces.filter(province => province.name.toLowerCase().indexOf(search) > -1)
        );
    }

    protected filterGroups() {
        if (!this.groups) {
            return;
        }
        let search = this.accountInfoForm.controls.groupFilterCtrl.value;
        if (!search) {
            this.filteredGroups.next(this.groups.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.filteredGroups.next(
            this.groups.filter(group => group.name.toLowerCase().indexOf(search) > -1)
        );
    }

    public errorHandling = (control: string, error: string) => {
        return this.accountInfoForm.get(control).hasError(error);
    };

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.accountInfoForm.reset();
    }
}
