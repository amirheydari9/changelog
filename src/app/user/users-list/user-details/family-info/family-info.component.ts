import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {educationalStage, familyRelationship, jobStatus, maritalStatuses, genders} from '../../../../shared/contstants/constants';
import {ReplaySubject, Subject} from 'rxjs';
import {ICity} from '../../../../DTO/common/ICity';
import {CommonService} from '../../../../services/common/common.service';
import {takeUntil} from 'rxjs/operators';
import {ApplicantFamilyRelationshipsService} from '../../../../services/applicant-family-relationships/applicant-family-relationships.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-family-info',
    templateUrl: './family-info.component.html',
    styleUrls: ['./family-info.component.scss']
})
export class FamilyInfoComponent implements OnInit, OnDestroy {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    displayedColumns: string[] = ['familyRelationship', 'isAlive', 'job', 'education', 'action'];
    dataSource = new MatTableDataSource<any>();

    familyInfoForm: FormGroup;
    formMode = 'create';

    @ViewChild(MatPaginator) paginator: MatPaginator;

    familyRelationship = familyRelationship;
    jobStatus = jobStatus;
    educationalStage = educationalStage;
    maritalStatus = maritalStatuses;
    gender = genders;

    cities;
    provinces;

    public filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredProvinces: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    protected _onDestroy = new Subject<void>();

    constructor(
        private commonService: CommonService,
        private applicantFamilyRelationshipsService: ApplicantFamilyRelationshipsService,
        private alertService: ToastrService,
    ) {
        //TODO وقتی میخوایم پدر یا مادر اضافه کنیم اگه از قبل بود چی میشه ؟
    }

    ngOnInit() {

        this.commonService.getBehaviourCities().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.cities = data;
                    this.filteredCities.next(this.cities.slice());
                }
            }
        );

        this.commonService.getBehaviourProvinces().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.provinces = data;
                    this.filteredProvinces.next(this.provinces.slice());
                }
            }
        );

        this.dataSource = new MatTableDataSource<any>(this.userData.familyRelations);
        this.dataSource.paginator = this.paginator;
        this.initForm();
        if (!this.isTebyanAdmin) {
            this.familyInfoForm.disable();
        }

        this.familyInfoForm.controls.cityFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterCities();
            });

        this.familyInfoForm.controls.provinceFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this.filterProvinces();
            });
    }

    initForm() {

        this.familyInfoForm = new FormGroup({
            applicantFamilyRelationId: new FormControl(null),
            familyRelationship: new FormControl(null, [Validators.required]),
            gender: new FormControl(null, [Validators.required]),
            isAlive: new FormControl(false),
            birthYear: new FormControl(null),
            placeOfBirthProvinceId: new FormControl(null),
            placeOfBirthCityId: new FormControl(null),
            jobStatus: new FormControl(null),
            educationalStage: new FormControl(null),
            maritalStatus: new FormControl(null),
            spouseEducationalStage: new FormControl(null),
            spouseJobStatus: new FormControl(null),
            provinceFilterCtrl: new FormControl(),
            cityFilterCtrl: new FormControl(),
        })
    }

    protected filterCities() {
        if (!this.cities) {
            return;
        }
        let search = this.familyInfoForm.controls.cityFilterCtrl.value;
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
        let search = this.familyInfoForm.controls.provinceFilterCtrl.value;
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

    createOrUpdateRelationShip() {

        const relationInfo = {
            familyRelationship: this.familyInfoForm.controls.familyRelationship.value,
            gender: this.familyInfoForm.controls.gender.value,
            isAlive: this.familyInfoForm.controls.isAlive.value,
            birthYear: +this.familyInfoForm.controls.birthYear.value,
            placeOfBirthCityId: this.familyInfoForm.controls.placeOfBirthCityId.value ? this.familyInfoForm.controls.placeOfBirthCityId.value.id : null,
            jobStatus: this.familyInfoForm.controls.jobStatus.value,
            educationalStage: this.familyInfoForm.controls.educationalStage.value,
            maritalStatus: this.familyInfoForm.controls.maritalStatus.value,
            spouseEducationalStage: this.familyInfoForm.controls.spouseEducationalStage.value,
            spouseJobStatus: this.familyInfoForm.controls.spouseJobStatus.value,
        };

        if (this.formMode === 'create' && this.familyInfoForm.valid) {
            this.applicantFamilyRelationshipsService.createFamilyRelationships(this.userData.applicant.id, relationInfo).subscribe(
                (data) => {
                    this.alertService.success('عملیات با موفقیت انجام شد');
                    this.familyInfoForm.reset();
                    this.applicantFamilyRelationshipsService.getAllFamilyRelationships(this.userData.applicant.id).subscribe(
                        (res) => {
                            this.dataSource = new MatTableDataSource<any>(res.items);
                            this.dataSource.paginator = this.paginator;
                            this.paginator.lastPage();
                        }
                    )
                }, error => this.alertService.error('عملیات انجام نشد')
            )
        }

        if (this.formMode === 'update' && this.familyInfoForm.valid) {
            this.applicantFamilyRelationshipsService.updateFamilyRelationships(
                this.userData.applicant.id, this.familyInfoForm.controls.applicantFamilyRelationId.value, relationInfo).subscribe(
                (data) => {
                    this.alertService.success('عملیات با موفقیت انجام شد');
                    this.applicantFamilyRelationshipsService.getAllFamilyRelationships(this.userData.applicant.id).subscribe(
                        (res) => {
                            this.dataSource = new MatTableDataSource<any>(res.items);
                            this.dataSource.paginator = this.paginator;
                        }
                    )
                }, error => this.alertService.error('عملیات انجام نشد')
            )
        }
    }

    viewDetail($event: MouseEvent, element: any) {
        this.familyInfoForm.reset();
        this.applicantFamilyRelationshipsService.getFamilyRelationships(this.userData.applicant.id, element.applicantFamilyRelationId).subscribe(
            (data) => {
                this.formMode = 'update';

                const province = this.provinces.filter(item => item.id === data.placeOfBirthProvinceId)[0];
                const city = this.cities.filter(item => item.id === data.placeOfBirthCityId)[0];

                this.familyInfoForm.controls.applicantFamilyRelationId.setValue(data.applicantFamilyRelationId);
                this.familyInfoForm.controls.familyRelationship.setValue(data.familyRelationship);
                this.familyInfoForm.controls.gender.setValue(data.gender);
                this.familyInfoForm.controls.isAlive.setValue(data.isAlive);
                this.familyInfoForm.controls.birthYear.setValue(data.birthYear);
                this.familyInfoForm.controls.placeOfBirthProvinceId.setValue(province);
                this.familyInfoForm.controls.placeOfBirthCityId.setValue(city);
                this.familyInfoForm.controls.jobStatus.setValue(data.jobStatus);
                this.familyInfoForm.controls.educationalStage.setValue(data.educationalStage);
                this.familyInfoForm.controls.maritalStatus.setValue(data.maritalStatus);
                this.familyInfoForm.controls.spouseEducationalStage.setValue(data.spouseEducationalStage);
                this.familyInfoForm.controls.spouseJobStatus.setValue(data.spouseJobStatus);
            }
        );
    }

    deleteRelation($event: MouseEvent, element: any) {

        if (this.formMode === 'update') {
            this.alertService.info('فرم در حالت ویرایش است');
            return false;
        }
        this.applicantFamilyRelationshipsService.deleteFamilyRelationships(this.userData.applicant.id, element.applicantFamilyRelationId).subscribe(
            () => {
                this.alertService.success('عملیات با موفقیت انجام شد');
                this.applicantFamilyRelationshipsService.getAllFamilyRelationships(this.userData.applicant.id).subscribe(
                    (res) => {
                        this.dataSource = new MatTableDataSource<any>(res.items);
                        this.dataSource.paginator = this.paginator;
                    }
                )
            }, error => this.alertService.error('عملیات انجام نشد')
        )
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.familyInfoForm.reset();
    }

    public errorHandling = (control: string, error: string) => {
        return this.familyInfoForm.get(control).hasError(error);
    };

    editCancel() {
        this.formMode = 'create';
        this.familyInfoForm.reset();
    }
}
