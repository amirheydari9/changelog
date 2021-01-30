import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'jalali-moment';
import {agentLevels, genders} from '../../../../shared/contstants/constants';
import {ICity} from '../../../../DTO/common/ICity';
import {IProvince} from '../../../../DTO/common/IProvince';
import {takeUntil} from 'rxjs/operators';
import {ReplaySubject, Subject} from 'rxjs';
import {CommonService} from '../../../../services/common/common.service';
import {AgentService} from '../../../../services/agent/agent.service';
import {ToastrService} from 'ngx-toastr';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {validMobile, validNationalId, validTel} from '../../../../shared/Rules/Rules';

@Component({
    selector: 'app-agent-info',
    templateUrl: './agent-info.component.html',
    styleUrls: ['./agent-info.component.scss']
})
export class AgentInfoComponent implements OnInit, OnDestroy {

    @Input() agentData: any;
    @Output() newAgentInfo: EventEmitter<any> = new EventEmitter<any>();
    @Output() agentMode: EventEmitter<any> = new EventEmitter<any>();

    agentInfoForm: FormGroup;
    genders = genders;
    agentLevels = agentLevels;
    province = null;
    city = null;
    cities: ICity[];
    provinces: IProvince[];
    groups: any;
    group: any;
    public filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredProvinces: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredGroups: ReplaySubject<any> = new ReplaySubject<any>(1);
    protected _onDestroy = new Subject<void>();

    birthday: string;
    registrationDate: string;

    constructor(
        private commonService: CommonService,
        private agentService: AgentService,
        private alertService: ToastrService
    ) {

    }

    ngOnInit() {

        this.commonService.getBehaviourCities().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.cities = data;
                    this.filteredCities.next(this.cities.slice());
                    if (this.agentData) {
                        this.city = this.cities.filter(city => city.id === this.agentData.agent.placeOfResidenceCityId)[0];
                    }
                }
            }
        );

        this.commonService.getBehaviourProvinces().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.provinces = data;
                    this.filteredProvinces.next(this.provinces.slice());
                    if (this.agentData) {
                        this.province = this.provinces.filter(province => province.id === this.agentData.agent.placeOfResidenceProvinceId)[0];
                    }
                }
            }
        );

        this.agentService.getBehaviourAgentGroups().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.groups = data;
                    this.filteredGroups.next(this.groups.slice());
                    if (this.agentData) {
                        this.group = this.groups.filter(group => group.id === this.agentData.agent.groupId)[0];
                    }
                }
            }
        );

        this.initForm();

        if (this.agentData) {
            this.agentInfoForm.controls.mobile.disable();
            this.birthday = moment(this.agentInfoForm.controls.birthday.value, 'fa').format('jYYYY/jMM/jDD');
            this.registrationDate = moment(this.agentInfoForm.controls.registrationDate.value, 'fa').format('jYYYY/jMM/jDD');
        }

        this.agentInfoForm.controls.cityFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCities();
            });

        this.agentInfoForm.controls.provinceFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterProvinces();
            });

        this.agentInfoForm.controls.groupFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterGroups();
            });
    }

    initForm() {
        this.agentInfoForm = new FormGroup({
            firstname: new FormControl(this.agentData ? this.agentData.agent.firstname : null, [Validators.required]),
            lastname: new FormControl(this.agentData ? this.agentData.agent.lastname : null, [Validators.required]),
            nationalId: new FormControl(this.agentData ? this.agentData.agent.nationalId : null,
                [Validators.required, validNationalId]),
            gender: new FormControl(this.agentData ? this.agentData.agent.gender : null, [Validators.required]),
            mobile: new FormControl(this.agentData ? this.agentData.agent.mobileNumber : null,
                [Validators.required, validMobile]),
            tel: new FormControl(this.agentData ? this.agentData.agent.tel : null,
                [Validators.required, validTel]),
            agentCode: new FormControl(this.agentData ? this.agentData.agent.agentCode : null, [Validators.required]),
            birthday: new FormControl(this.agentData ? moment.from(this.agentData.agent.birthday, 'fa') : null, [Validators.required]),
            placeOfResidenceCity: new FormControl(this.agentData ? this.city : null, [Validators.required]),
            placeOfResidenceProvince: new FormControl(this.agentData ? this.province : null, [Validators.required]),
            address: new FormControl(this.agentData ? this.agentData.agent.address : null, [Validators.required]),
            description: new FormControl(this.agentData ? this.agentData.agent.description : null, [Validators.required]),
            group: new FormControl(this.agentData ? this.group : null, [Validators.required]),
            level: new FormControl(this.agentData ? this.agentData.agent.level : null, [Validators.required]),
            registrationDate: new FormControl(this.agentData ? moment.from(this.agentData.agent.registrationDate, 'fa') : null, [Validators.required]),
            cityFilterCtrl: new FormControl(),
            provinceFilterCtrl: new FormControl(),
            groupFilterCtrl: new FormControl(),
        })
    }

    protected filterCities() {
        if (!this.cities) {
            return;
        }
        let search = this.agentInfoForm.controls.cityFilterCtrl.value;
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
        let search = this.agentInfoForm.controls.provinceFilterCtrl.value;
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
        let search = this.agentInfoForm.controls.groupFilterCtrl.value;
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

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.agentInfoForm.reset();
    }

    editOrCreateAgent() {

        if (this.agentInfoForm.valid) {
            const agent = {
                nationalId: this.agentInfoForm.controls.nationalId.value,
                firstname: this.agentInfoForm.controls.firstname.value,
                lastname: this.agentInfoForm.controls.lastname.value,
                gender: this.agentInfoForm.controls.gender.value,
                tel: this.agentInfoForm.controls.tel.value,
                agentCode: this.agentInfoForm.controls.agentCode.value,
                birthday: this.birthday,
                placeOfResidenceCityId: this.agentInfoForm.controls.placeOfResidenceCity.value ? this.agentInfoForm.controls.placeOfResidenceCity.value.id : null,
                address: this.agentInfoForm.controls.address.value,
                description: this.agentInfoForm.controls.description.value,
                groupId: this.agentInfoForm.controls.group.value.id,
                level: this.agentInfoForm.controls.level.value,
                registrationDate: this.registrationDate,
            };
            if (this.agentData) {
                this.agentService.updateAgent(this.agentData.agent.id, agent).subscribe(() => {
                    this.alertService.success('ویرایش معرف ازدواج با موفقیت انجام شد');
                    this.agentMode.emit('updated');
                }, error => this.alertService.success('ویرایش معرف ازدواج انجام نشد'))
            } else {
                agent['mobileNumber'] = this.agentInfoForm.controls.mobile.value;
                this.agentService.createAgent(agent).subscribe(
                    (data) => {
                        this.alertService.success('ثبت معرف ازدواج با موفقیت انجام شد');
                        this.agentInfoForm.controls.mobile.disable();
                        this.newAgentInfo.emit(data);
                    }, error => {
                        this.alertService.error(error);
                    }
                )
            }
        }
    }

    onChangeBirthday($event: MatDatepickerInputEvent<moment.Moment>) {
        this.birthday = moment($event.value).format('jYYYY/jMM/jDD');
    }

    onChangeRegistrationDate($event: MatDatepickerInputEvent<moment.Moment>) {
        this.registrationDate = moment($event.value).format('jYYYY/jMM/jDD');
    }

    public errorHandling = (control: string, error: string) => {
        return this.agentInfoForm.get(control).hasError(error);
    }
}
