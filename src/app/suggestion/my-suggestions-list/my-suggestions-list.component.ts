import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {ICity} from '../../DTO/common/ICity';
import {ReplaySubject, Subject, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {ToastrService} from 'ngx-toastr';
import {map, takeUntil} from 'rxjs/operators';
import {suggestionAgentAssignmentStatus, suggestionStates} from '../../shared/contstants/constants';
import {slideToggle} from 'tw-slide-toggle';
import {SuggestionService} from '../../services/suggestion/suggestion.service';
import {SuggestionDetailsComponent} from '../suggestions-list/suggestion-details/suggestion-details.component';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-my-suggestions-list',
    templateUrl: './my-suggestions-list.component.html',
    styleUrls: ['./my-suggestions-list.component.scss']
})
export class MySuggestionsListComponent implements OnInit, OnDestroy {

    showSearchPanel = true;
    closeSearchSetting = false;
    showTable = false;

    displayedColumns: string[] = ['mateFullName', 'matePlace', 'suggestedFullName', 'suggestedPlace', 'agentAssignmentStatusText', 'action'];
    dataSource = new MatTableDataSource<any>();

    suggestionAgentAssignmentStatus = suggestionAgentAssignmentStatus;
    suggestionStates = suggestionStates;

    pageEvent: PageEvent;
    len = 0;
    pageSize = 0;

    mySuggestionsListForm: FormGroup;

    mateCities: ICity[];
    suggestedCites: ICity[];

    protected _onDestroy = new Subject<void>();
    subscription: Subscription = new Subscription();

    public mateFilteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public suggestedFilteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private commonService: CommonService,
        private alertService: ToastrService,
        private suggestionService: SuggestionService
    ) {

    }

    ngOnInit() {

        this.initForm();

        this.commonService.getBehaviourCities().subscribe(
            (data) => {
                if (data) {
                    this.mateCities = this.suggestedCites = data;
                    this.mateFilteredCities.next(this.mateCities.slice());
                    this.suggestedFilteredCities.next(this.suggestedCites.slice());
                }
            }
        );

        this.mySuggestionsListForm.controls.mateCityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this.mateFilterCities();
            });

        this.mySuggestionsListForm.controls.suggestedCityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
                this.suggestedFilterCities();
            });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
        this.subscription.unsubscribe();
    }


    protected mateFilterCities() {
        if (!this.mateCities) {
            return;
        }
        let search = this.mySuggestionsListForm.controls.mateCityFilterCtrl.value;
        if (!search) {
            this.mateFilteredCities.next(this.mateCities.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.mateFilteredCities.next(
            this.mateCities.filter(city => city.name.toLowerCase().indexOf(search) > -1)
        );
    }

    protected suggestedFilterCities() {
        if (!this.suggestedCites) {
            return;
        }
        let search = this.mySuggestionsListForm.controls.suggestedCityFilterCtrl.value;
        if (!search) {
            this.suggestedFilteredCities.next(this.suggestedCites.slice());
            return;
        } else {
            search = search.toLowerCase();
        }
        this.suggestedFilteredCities.next(
            this.suggestedCites.filter(city => city.name.toLowerCase().indexOf(search) > -1)
        );
    }

    initForm() {
        this.mySuggestionsListForm = new FormGroup({
            SearchValue: new FormControl(''),
            MatePlaceOfResidenceCityIds: new FormControl(),
            SuggestedPlaceOfResidenceCityIds: new FormControl(),
            mateCityFilterCtrl: new FormControl(),
            suggestedCityFilterCtrl: new FormControl(),
            Statuses: new FormControl(),
            AssignmentStatuses: new FormControl()
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
        this.mySuggestionsListForm.reset();
        this.mySuggestionsListForm.controls.SearchValue.setValue('');
    }

    getAllSuggestions(pageIndex, pageSize) {
        const searchInputs = this.getLastSearchInputValues();
        this.subscription.add(
            this.suggestionService.getMySuggestionsList(
                this.mySuggestionsListForm.controls.SearchValue.value,
                searchInputs.MatePlaceOfResidenceCityIds,
                searchInputs.SuggestedPlaceOfResidenceCityIds,
                searchInputs.Statuses,
                searchInputs.AssignmentStatuses,
                pageIndex,
                pageSize,
            ).subscribe(
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
            )
        )
    }

    searchMySuggestions() {
        this.showTable = false;
        this.getAllSuggestions(1, 5);
    }

    onPaginateChange($event: PageEvent) {

        const page = $event.pageIndex;
        const size = $event.pageSize;
        this.getAllSuggestions(page + 1, size);
    }

    returnCurrentPage($event: any) {

        this.getAllSuggestions(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }

    getLastSearchInputValues() {

        const MatePlaceOfResidenceCityIds = [];

        if (this.mySuggestionsListForm.controls.MatePlaceOfResidenceCityIds.value && this.mySuggestionsListForm.controls.MatePlaceOfResidenceCityIds.value.length > 0) {
            this.mySuggestionsListForm.controls.MatePlaceOfResidenceCityIds.value.forEach(item => MatePlaceOfResidenceCityIds.push(item.id));
        }

        const SuggestedPlaceOfResidenceCityIds = [];

        if (this.mySuggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value && this.mySuggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value.length > 0) {
            this.mySuggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value.forEach(item => SuggestedPlaceOfResidenceCityIds.push(item.id));
        }

        const Statuses = [];

        if (this.mySuggestionsListForm.controls.Statuses.value && this.mySuggestionsListForm.controls.Statuses.value.length > 0) {
            this.mySuggestionsListForm.controls.Statuses.value.forEach(item => Statuses.push(item.value));
        }

        const AssignmentStatuses = [];

        if (this.mySuggestionsListForm.controls.AssignmentStatuses.value && this.mySuggestionsListForm.controls.AssignmentStatuses.value.length > 0) {
            this.mySuggestionsListForm.controls.AssignmentStatuses.value.forEach(item => AssignmentStatuses.push(item.value));
        }
        return {
            MatePlaceOfResidenceCityIds, SuggestedPlaceOfResidenceCityIds, Statuses, AssignmentStatuses
        }
    }

    unAssignSuggestion($event: MouseEvent, element: any) {

        this.subscription.add(
            this.suggestionService.unAssignSuggestionFromAgent(element.id).subscribe(
                () => {
                    this.alertService.success('عملیات با موفقیت انجام شد');
                    const pageIndex = this.paginator.pageIndex;
                    const pageSize = this.paginator.pageSize;
                    this.getAllSuggestions(pageIndex + 1, pageSize);
                }, error => this.alertService.error('عملیات انجام نشد')
            )
        )
    }

    showSuggestionDetail($event: MouseEvent, element: any) {
        $event.stopPropagation();
        this.suggestionService.getMySuggestionDetail(element.id).subscribe(
            (data) => {
                // TODO پیاده سازی سرویس دریاقت جزئیات پیشنهاد ایجنت
                const dialogRef = this.dialog.open(SuggestionDetailsComponent, {
                    disableClose: true,
                    data: {mateUserInfo: data.applicant, suggestedUserInfo: data.otherSideApplicant}
                });
            }, error => this.alertService.error('خطایی رخ داده است')
        )
    }

    resetControl($event: MouseEvent, control: string, inputType?: string) {
        $event.stopPropagation();
        if (inputType === 'input') {
            this.mySuggestionsListForm.controls.SearchValue.setValue('');
            return;
        }
        this.mySuggestionsListForm.get(control).setValue(null);
    }
}
