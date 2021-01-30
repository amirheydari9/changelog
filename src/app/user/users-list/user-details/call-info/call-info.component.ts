import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {CommonService} from '../../../../services/common/common.service';
import {ReplaySubject, Subject} from 'rxjs';
import {ICity} from '../../../../DTO/common/ICity';
import {validMobile} from '../../../../shared/Rules/Rules';

@Component({
    selector: 'app-call-info',
    templateUrl: './call-info.component.html',
    styleUrls: ['./call-info.component.scss']
})
export class CallInfoComponent implements OnInit, OnDestroy {
    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    protected _onDestroy = new Subject<void>();

    public filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredProvinces: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);

    callInfoForm: FormGroup;

    provinces = [];
    cities = [];

    province = null;
    city = null;

    constructor(
        private commonService: CommonService,
    ) {
    }

    ngOnInit() {

        this.commonService.getBehaviourProvinces().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.provinces = data;
                    this.filteredProvinces.next(this.provinces.slice());

                    this.province = this.provinces.filter(province => province.id === this.userData.applicant.placeOfResidenceProvinceId)[0];
                }
            }
        );

        this.commonService.getBehaviourCities().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.cities = data;
                    this.filteredCities.next(this.cities.slice());

                    this.city = this.cities.filter(city => city.id === this.userData.applicant.placeOfResidenceCityId)[0];
                }
            }
        );

        this.initForm();

        this.callInfoForm.controls.mobile.disable();

        if (!this.isTebyanAdmin) {
            this.callInfoForm.disable();
        }

        this.callInfoForm.controls.cityFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCities();
            });

        this.callInfoForm.controls.provinceFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterProvinces();
            });

        this.callInfoForm.valueChanges.subscribe(() => {
            if (this.callInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.callInfoForm.valid) {
                this.formHasError.emit(false);
                this.userInfoChanged.emit({
                    telephoneNumberAreaCode: this.callInfoForm.controls.telephoneNumberAreaCode.value,
                    telephoneNumber: this.callInfoForm.controls.telephoneNumber.value,
                    email: this.callInfoForm.controls.email.value,
                    address: this.callInfoForm.controls.address.value,
                    zipCode: this.callInfoForm.controls.zipCode.value,
                    placeOfResidenceCityId: this.callInfoForm.controls.placeOfResidenceCityId.value ? this.callInfoForm.controls.placeOfResidenceCityId.value.id : null,
                })
            }
        });
    }

    initForm() {
        this.callInfoForm = new FormGroup({
            telephoneNumberAreaCode: new FormControl(this.userData.applicant.telephoneNumberAreaCode),
            telephoneNumber: new FormControl(this.userData.applicant.telephoneNumber),
            mobile: new FormControl(this.userData.applicant.mobile, [Validators.required, validMobile]),
            email: new FormControl(this.userData.applicant.email, [Validators.email]),
            zipCode: new FormControl(this.userData.applicant.zipCode),
            placeOfResidenceProvinceId: new FormControl(this.province),
            placeOfResidenceCityId: new FormControl(this.city),
            address: new FormControl(this.userData.applicant.address),
            provinceFilterCtrl: new FormControl(),
            cityFilterCtrl: new FormControl(),
        })
    }

    protected filterProvinces() {
        if (!this.provinces) {
            return;
        }
        let search = this.callInfoForm.controls.provinceFilterCtrl.value;
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

    protected filterCities() {
        if (!this.cities) {
            return;
        }
        let search = this.callInfoForm.controls.cityFilterCtrl.value;
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

    public errorHandling = (control: string, error: string) => {
        return this.callInfoForm.get(control).hasError(error);
    };

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}
