import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ReplaySubject, Subject} from 'rxjs';
import {ICity} from '../../../DTO/common/ICity';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {SuggestionService} from '../../../services/suggestion/suggestion.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-suggestion-combo-agent',
  templateUrl: './suggestion-combo-agent.component.html',
  styleUrls: ['./suggestion-combo-agent.component.scss']
})
export class SuggestionComboAgentComponent implements OnInit {

  agentComboForm: FormGroup;
  agents = [];
  public agentFiltered: ReplaySubject<ICity[]> = new ReplaySubject<ICity[]>(1);
  protected _onDestroy = new Subject<void>();

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private alertService: ToastrService,
      private suggestionService: SuggestionService,
  ) {
  }

  ngOnInit() {

    this.initForm();

    this.data.agents.forEach(item => {
      const row = {id: item.id, name: item.firstname + ' ' + item.lastname};
      this.agents.push(row);
    });

    this.agentFiltered.next(this.agents);

    this.agentComboForm.controls.agentCtrl.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(
        () => {
          this.agentFilter();
        });
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

  initForm() {
    this.agentComboForm = new FormGroup({
      agents: new FormControl(null, Validators.required),
      agentCtrl: new FormControl()
    })
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  assignToAgent() {

    if (this.agentComboForm.valid) {

      this.suggestionService.editSuggestion(this.data.suggestionId, this.agentComboForm.controls.agents.value.id).subscribe(
          () => {
            this.alertService.success('عملیات با موفقیت انجام شد')
          }, error => this.alertService.error('عملیات انجام نشد')
      )
    }
  }

}
