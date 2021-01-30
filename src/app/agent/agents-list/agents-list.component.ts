import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {maritalStatuses, mateState, genders} from '../../shared/contstants/constants';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {ICity} from '../../DTO/common/ICity';
import {ReplaySubject, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {CommonService} from '../../services/common/common.service';
import {ToastrService} from 'ngx-toastr';
import {map, takeUntil} from 'rxjs/operators';
import {UserDetailsComponent} from '../../user/users-list/user-details/user-details.component';
import {AgentService} from '../../services/agent/agent.service';
import * as moment from 'jalali-moment';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {slideToggle} from 'tw-slide-toggle';
import {AgentDetailComponent} from './agent-detail/agent-detail.component';
import {MatTableDataSource} from '@angular/material/table';


@Component({
    selector: 'app-agents-list',
    templateUrl: './agents-list.component.html',
    styleUrls: ['./agents-list.component.scss']
})
export class AgentsListComponent implements OnInit, OnDestroy {

    showSearchPanel = true;
    closeSearchSetting = false;
    showTable = false;

    displayedColumns: string[] = ['fullName', 'gender', 'group', 'agentCode', 'place', 'action'];
    dataSource = new MatTableDataSource<any>();


    genders = genders;

    pageEvent: PageEvent;
    len = 0;
    pageSize = 0;


    agentsListForm: FormGroup;

    cities: ICity[];
    groups: any[];

    protected _onDestroy = new Subject<void>();

    public filteredCities: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
    public filteredGroups: ReplaySubject<any> = new ReplaySubject<any>(1);

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public dialog: MatDialog,
        private agentService: AgentService,
        private commonService: CommonService,
        private alertService: ToastrService
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

        this.agentsListForm.controls.cityFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterCities();
        });

        this.agentService.getBehaviourAgentGroups().pipe(takeUntil(this._onDestroy)).subscribe(
            (data) => {
                this.groups = data;
                this.filteredGroups.next(this.groups.slice());
            }
        );

        this.agentsListForm.controls.groupFilterCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(() => {
            this.filterGroups();
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
        let search = this.agentsListForm.controls.cityFilterCtrl.value;
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

    protected filterGroups() {
        if (!this.groups) {
            return;
        }
        let search = this.agentsListForm.controls.groupFilterCtrl.value;
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

    initForm() {
        this.agentsListForm = new FormGroup({
            SearchValue: new FormControl(''),
            Genders: new FormControl(),
            CityIds: new FormControl(),
            cityFilterCtrl: new FormControl(),
            GroupIds: new FormControl(),
            groupFilterCtrl: new FormControl(),
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
        this.agentsListForm.reset();
        this.agentsListForm.controls.SearchValue.setValue('');
    }

    createAgent($event: any) {
        $event.stopPropagation();
        const dialogRef = this.dialog.open(AgentDetailComponent, {disableClose: true, data: null});
        dialogRef.afterClosed().subscribe(res => {
            console.log(res);
        })
    }

    editAgent($event: MouseEvent, element: any) {
        $event.stopPropagation();

        this.agentService.getAgentById(element.id).subscribe(
            (data) => {
                const dialogRef = this.dialog.open(AgentDetailComponent, {disableClose: true, data: data});
                dialogRef.afterClosed().subscribe(res => {
                    if (!res.data) {
                        return;
                    }
                    if (res.data === 'updated') {
                        const pageIndex = this.paginator.pageIndex;
                        const pageSize = this.paginator.pageSize;
                        this.getAllAgents(pageIndex + 1, pageSize);
                    }
                })
            }, error => this.alertService.error('خطایی رخ داده است')
        );
    }

    getAllAgents(pageIndex, pageSize) {

        const searchInputs = this.getLastSearchInputValues();

        this.agentService.getAgents(
            this.agentsListForm.controls.SearchValue.value,
            searchInputs.Genders,
            searchInputs.CityIds,
            searchInputs.GroupIds,
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

    searchAgents() {

        this.showTable = false;
        this.getAllAgents(1, 5);
    }

    onPaginateChange($event: PageEvent) {

        const page = $event.pageIndex;
        const size = $event.pageSize;
        this.getAllAgents(page + 1, size);
    }

    returnCurrentPage($event: any) {

        this.getAllAgents(this.paginator.pageIndex + 1, this.paginator.pageSize);
    }

    getLastSearchInputValues() {

        const Genders = [];

        if (this.agentsListForm.controls.Genders.value && this.agentsListForm.controls.Genders.value.length > 0) {
            this.agentsListForm.controls.Genders.value.forEach(item => Genders.push(item.value));
        }

        const CityIds = [];

        if (this.agentsListForm.controls.CityIds.value && this.agentsListForm.controls.CityIds.value.length > 0) {
            this.agentsListForm.controls.CityIds.value.forEach(item => CityIds.push(item.id));
        }

        const GroupIds = [];

        if (this.agentsListForm.controls.GroupIds.value && this.agentsListForm.controls.GroupIds.value.length > 0) {
            this.agentsListForm.controls.GroupIds.value.forEach(item => GroupIds.push(item.id));
        }

        return {
            Genders, CityIds, GroupIds
        }
    }

    resetControl($event: MouseEvent, control: string, inputType?: string) {
        $event.stopPropagation();
        if (inputType === 'input') {
            this.agentsListForm.controls.SearchValue.setValue('');
            return;
        }
        this.agentsListForm.get(control).setValue(null);
    }
}
