import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {slideToggle} from 'tw-slide-toggle';
import {MatDialog} from '@angular/material/dialog';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UsersListService} from '../../services/user/users-list.service';
import {takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {CommonService} from '../../services/common/common.service';
import {ICity} from '../../DTO/common/ICity';
import {ReplaySubject, Subject} from 'rxjs';
import {genders, maritalStatuses, mateState} from '../../shared/contstants/constants';
import {ToastrService} from 'ngx-toastr';
import * as moment from 'jalali-moment';
import {RespondentService} from '../../services/respondent/respondent.service';
import {DebugService} from '../../services/debug/debug.service';
import {environment} from '../../../environments/environment';

// import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

    closeSearchSetting = false;
    showSearchPanel = true;
    showTable = false;

    displayedColumns: string[] = ['fullName', 'gender', 'mobile', 'place', 'maritalStatus', 'action'];
    dataSource = new MatTableDataSource<any>();

    genders = genders;
    martialStatuses = maritalStatuses;
    States = mateState;

    pageEvent: PageEvent;
    len = 0;
    pageSize = 0;

    usersListForm: FormGroup;

    cities: ICity[];

    environment = environment;

    _onDestroy = new Subject<void>();

    filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private usersListService: UsersListService,
        private commonService: CommonService,
        private alertService: ToastrService,
        private respondentService: RespondentService,
        private debugService: DebugService
    ) {

    }

    ngOnInit() {

        this.initForm();

        this.commonService.getBehaviourCities().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data && data.length > 0) {
                    this.cities = data;
                    this.filteredCities.next(this.cities.slice());
                }
            }
        );

        this.usersListForm.controls.cityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterCities();
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    protected filterCities() {
        if (!this.cities) {
            return;
        }
        let search = this.usersListForm.controls.cityFilterCtrl.value;
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


    initForm() {
        this.usersListForm = new FormGroup({
            SearchValue: new FormControl(''),
            Genders: new FormControl(),
            CityIds: new FormControl(),
            stateGroup: new FormControl(),
            cityFilterCtrl: new FormControl(),
            ActiveSuggestionStatuses: new FormControl(),
            ActiveIncomingSuggestionStatuses: new FormControl(),
            MaritalStatuses: new FormControl(),
            States: new FormControl(),
            FromDate: new FormControl(),
            ToDate: new FormControl(),
        })
    }

    slide() {
        const target = document.querySelector('.searchPanel');
        slideToggle(target, {
            duration: 500,
        });

        this.showSearchPanel = !this.showSearchPanel;
    }

    resetSearchPanel() {
        this.usersListForm.reset();
        this.usersListForm.controls.SearchValue.setValue('');
    }

    editUser($event: MouseEvent, element: any) {
        $event.stopPropagation();
        let respondent = [];
        this.usersListService.getUserInfoDetails(element.id).subscribe(
            (data) => {
                this.respondentService.getRespondent(element.id).subscribe(
                    (value) => {
                        respondent = value.items;
                        const dialogRef = this.dialog.open(UserDetailsComponent, {
                            disableClose: true,
                            data: {...data, respondent: respondent}
                        });
                        dialogRef.afterClosed().subscribe(res => {
                        })
                    }, error => {
                        this.alertService.error('خطا در دریافت اطلاعات آزمون')
                    }
                );
            }, error => this.alertService.error('خطایی رخ داده است')
        );
    }

    getAllMates(pageIndex, pageSize) {

        const searchInputs = this.getLastSearchInputValues();
        this.usersListService.getUsersList(
            this.usersListForm.controls.SearchValue.value,
            searchInputs.Genders,
            searchInputs.CityIds,
            searchInputs.MaritalStatuses,
            searchInputs.States,
            searchInputs.FromDate,
            searchInputs.ToDate,
            pageIndex,
            pageSize,
        ).pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                if (data.items && data.items.length > 0) {
                    this.dataSource = new MatTableDataSource<any>(data.items);
                    this.len = data.pagination.totalCount;
                    this.pageSize = data.pagination.pageSize;
                    this.showTable = true;
                } else {
                    this.alertService.info('موردی یافت نشد');
                }
            }, error => this.alertService.error('خطایی رخ داده است')
        );
    }

    searchUsers() {

        this.showTable = false;
        this.getAllMates(1, 5)
    }

    onPaginateChange($event: PageEvent) {

        const page = $event.pageIndex;
        const size = $event.pageSize;
        this.getAllMates(page + 1, size);
    }

    returnCurrentPage($event: any) {

        this.getAllMates(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }

    getLastSearchInputValues() {

        const Genders = [];

        if (this.usersListForm.controls.Genders.value && this.usersListForm.controls.Genders.value.length > 0) {
            this.usersListForm.controls.Genders.value.forEach(item => Genders.push(item.value));
        }

        const CityIds = [];

        if (this.usersListForm.controls.CityIds.value && this.usersListForm.controls.CityIds.value.length > 0) {
            this.usersListForm.controls.CityIds.value.forEach(item => CityIds.push(item.id));
        }

        const MaritalStatuses = [];

        if (this.usersListForm.controls.MaritalStatuses.value && this.usersListForm.controls.MaritalStatuses.value.length > 0) {
            this.usersListForm.controls.MaritalStatuses.value.forEach(item => MaritalStatuses.push(item.value));
        }

        const States = [];

        if (this.usersListForm.controls.States.value && this.usersListForm.controls.States.value.length > 0) {
            this.usersListForm.controls.States.value.forEach(item => States.push(item.value));
        }

        const FromDate = this.usersListForm.controls.FromDate.value ? moment(this.usersListForm.controls.FromDate.value, 'fa').format('jYYYY/jMM/jDD') : null;

        const ToDate = this.usersListForm.controls.ToDate.value ? moment(this.usersListForm.controls.ToDate.value, 'fa').format('jYYYY/jMM/jDD') : null;

        return {
            Genders, CityIds, MaritalStatuses, States, FromDate, ToDate
        }
    }

    deleteUser($event: MouseEvent, element: any) {
        $event.stopPropagation();
        this.debugService.deleteUser(element.id).pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                this.alertService.success('عملیات با موفقیت انجام شد')
            }, error => this.alertService.error('عملیات انجام نشد')
        );
    }

    resetControl($event: MouseEvent, control: string, inputType?: string) {
        $event.stopPropagation();
        if (inputType === 'input') {
            this.usersListForm.controls.SearchValue.setValue('');
            return;
        }
        this.usersListForm.get(control).setValue(null);
    }
}
