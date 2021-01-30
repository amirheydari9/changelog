import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICity} from '../../DTO/common/ICity';
import {ReplaySubject, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {ToastrService} from 'ngx-toastr';
import {AgentService} from '../../services/agent/agent.service';
import {SuggestionService} from '../../services/suggestion/suggestion.service';
import {takeUntil} from 'rxjs/operators';
import {slideToggle} from 'tw-slide-toggle';
import {suggestionAgentAssignmentStatus, suggestionStates} from '../../shared/contstants/constants';
import {SuggestionDetailsComponent} from './suggestion-details/suggestion-details.component';
import * as moment from 'jalali-moment';
import {MatTableDataSource} from '@angular/material/table';

@Component({
    selector: 'app-suggestions-list',
    templateUrl: './suggestions-list.component.html',
    styleUrls: ['./suggestions-list.component.scss']
})
export class SuggestionsListComponent implements OnInit, OnDestroy {

    showSearchPanel = true;
    closeSearchSetting = false;
    showTable = false;

    displayedColumns: string[] = ['mateFullName', 'matePlace', 'suggestedFullName', 'suggestedPlace', 'statusText', 'agentAssignmentStatusText', 'action'];
    dataSource = new MatTableDataSource<any>();

    suggestionStates = suggestionStates;
    agentAssignmentStatuses = suggestionAgentAssignmentStatus;

    pageEvent: PageEvent;
    len = 0;
    pageSize = 0;

    suggestionsListForm: FormGroup;
    agentComboForm: FormGroup;

    agents = [];
    mateCities: ICity[];
    suggestedCites: ICity[];

    protected _onDestroy = new Subject<void>();

    public mateFilteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public suggestedFilteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public agentFiltered: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private commonService: CommonService,
        private alertService: ToastrService,
        private agentService: AgentService,
        private suggestionService: SuggestionService
    ) {
    }

    ngOnInit() {

        this.initForm();

        this.agentComboForm = new FormGroup({
            agents: new FormControl(null, Validators.required),
            agentCtrl: new FormControl()
        });

        this.agentService.getAgentsForCombo().subscribe(
            (data) => {
                data.items.forEach(item => {
                    const row = {id: item.id, name: item.firstname + ' ' + item.lastname};
                    this.agents.push(row);
                });
                this.agentFiltered.next(this.agents.slice());
            }, error => this.alertService.error('خطا در دریافت لیست معرف های ازدواج')
        );

        this.agentComboForm.controls.agentCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
            () => {
                this.agentFilter();
            });

        this.commonService.getBehaviourCities().subscribe(
            (data) => {
                if (data) {
                    this.mateCities = this.suggestedCites = data;
                    this.mateFilteredCities.next(this.mateCities.slice());
                    this.suggestedFilteredCities.next(this.suggestedCites.slice());
                }
            }
        );

        this.suggestionsListForm.controls.mateCityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.mateFilterCities();
        });

        this.suggestionsListForm.controls.suggestedCityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.suggestedFilterCities();
        });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    protected agentFilter() {
        if (!this.agents) {
            return;
        }
        let search = this.agentComboForm.controls.agentCtrl.value;
        if (!search) {
            this.agentFiltered.next(this.agents);
            return;
        } else {
            search = search.toLowerCase();
        }
        this.agentFiltered.next(
            this.agents.filter(agent => agent.name.toLowerCase().indexOf(search) > -1)
        );
    }

    protected mateFilterCities() {
        if (!this.mateCities) {
            return;
        }
        let search = this.suggestionsListForm.controls.mateCityFilterCtrl.value;
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
        let search = this.suggestionsListForm.controls.suggestedCityFilterCtrl.value;
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
        this.suggestionsListForm = new FormGroup({
            SearchValue: new FormControl(''),
            MatePlaceOfResidenceCityIds: new FormControl(),
            SuggestedPlaceOfResidenceCityIds: new FormControl(),
            mateCityFilterCtrl: new FormControl(),
            suggestedCityFilterCtrl: new FormControl(),
            Statuses: new FormControl(),
            AgentAssignmentStatuses: new FormControl(),
            FromStatusChangedDate: new FormControl(),
            ToStatusChangedDate: new FormControl(),
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
        this.suggestionsListForm.reset();
        this.suggestionsListForm.controls.SearchValue.setValue('');
    }

    editUser($event: MouseEvent, element: any) {

        $event.stopPropagation();

        this.suggestionService.showSuggestionDetail(element.id).subscribe(
            (data) => {
                const dialogRef = this.dialog.open(SuggestionDetailsComponent, {
                    disableClose: true,
                    data: {mateUserInfo: data.applicant, suggestedUserInfo: data.otherSideApplicant}
                });
                dialogRef.afterClosed().subscribe(res => {
                    console.log(res);
                })
            }, error => this.alertService.error('خطایی رخ داده است')
        );
    }

    getAllSuggestions(pageIndex, pageSize) {

        const searchInputs = this.getLastSearchInputValues();

        this.agentComboForm.controls.agents.markAsUntouched();

        this.suggestionService.getSuggestionsList(
            this.suggestionsListForm.controls.SearchValue.value,
            searchInputs.MatePlaceOfResidenceCityIds,
            searchInputs.SuggestedPlaceOfResidenceCityIds,
            searchInputs.Statuses,
            searchInputs.AgentAssignmentStatuses,
            searchInputs.FromStatusChangedDate,
            searchInputs.ToStatusChangedDate,
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

    searchSuggestions() {

        this.showTable = false;
        this.getAllSuggestions(1, 5);
    }

    onPaginateChange($event: PageEvent) {

        const page = $event.pageIndex;
        const size = $event.pageSize;
        this.getAllSuggestions(page + 1, size)
    }

    returnCurrentPage($event: any) {

        this.getAllSuggestions(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }

    resetControl($event: MouseEvent, control: string, inputType?: string) {
        $event.stopPropagation();
        if (inputType === 'input') {
            this.suggestionsListForm.controls.SearchValue.setValue('');
            return;
        }
        this.suggestionsListForm.get(control).setValue(null);
    }

    getLastSearchInputValues() {

        const MatePlaceOfResidenceCityIds = [];

        if (this.suggestionsListForm.controls.MatePlaceOfResidenceCityIds.value && this.suggestionsListForm.controls.MatePlaceOfResidenceCityIds.value.length > 0) {
            this.suggestionsListForm.controls.MatePlaceOfResidenceCityIds.value.forEach(item => MatePlaceOfResidenceCityIds.push(item.id));
        }

        const SuggestedPlaceOfResidenceCityIds = [];

        if (this.suggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value && this.suggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value.length > 0) {
            this.suggestionsListForm.controls.SuggestedPlaceOfResidenceCityIds.value.forEach(item => SuggestedPlaceOfResidenceCityIds.push(item.id));
        }

        const Statuses = [];

        if (this.suggestionsListForm.controls.Statuses.value && this.suggestionsListForm.controls.Statuses.value.length > 0) {
            this.suggestionsListForm.controls.Statuses.value.forEach(item => Statuses.push(item.value));
        }

        const AgentAssignmentStatuses = [];

        if (this.suggestionsListForm.controls.AgentAssignmentStatuses.value && this.suggestionsListForm.controls.AgentAssignmentStatuses.value.length > 0) {
            this.suggestionsListForm.controls.AgentAssignmentStatuses.value.forEach(item => AgentAssignmentStatuses.push(item.value));
        }
        const FromStatusChangedDate = this.suggestionsListForm.controls.FromStatusChangedDate.value
            ? moment(this.suggestionsListForm.controls.FromStatusChangedDate.value, 'fa').format('jYYYY/jMM/jDD')
            : null;

        const ToStatusChangedDate = this.suggestionsListForm.controls.ToStatusChangedDate.value
            ? moment(this.suggestionsListForm.controls.ToStatusChangedDate.value, 'fa').format('jYYYY/jMM/jDD')
            : null;

        return {
            MatePlaceOfResidenceCityIds,
            SuggestedPlaceOfResidenceCityIds,
            Statuses,
            AgentAssignmentStatuses,
            FromStatusChangedDate,
            ToStatusChangedDate
        }
    }

    assignToAgent($event: MouseEvent, element: any) {
        $event.stopPropagation();
        if (!element.agentAssignmentStatus) {
            this.alertService.info('پیشنهاد قابل تخصیص نمی باشد')
        }
        if (element.agentAssignmentStatus === 1) {
            this.alertService.info('وضعیت پیشنهاد آماده تخصیص است')
        }
        if (element.agentAssignmentStatus === 2) {
            this.alertService.info('پیشنهاد قبلا به یک پیشتیبان ارجاع شده')
        }
        if (element.agentAssignmentStatus === 3) {
            if (this.agentComboForm.valid) {
                this.suggestionService.editSuggestion(element.id, this.agentComboForm.controls.agents.value.id).subscribe(
                    () => {
                        this.alertService.success('عملیات با موفقیت انجام شد');
                        const page = this.paginator.pageIndex;
                        const size = this.paginator.pageSize;
                        this.getAllSuggestions(page + 1, size);
                    }, error => this.alertService.error('عملیات انجام نشد')
                )
            } else {
                this.agentComboForm.controls.agents.markAsTouched();
            }
        }
    }

    public errorHandling = (control: string, error: string) => {
        return this.agentComboForm.get(control).hasError(error);
    };
}
