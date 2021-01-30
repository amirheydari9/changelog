import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {AgentService} from '../../../services/agent/agent.service';

@Component({
    selector: 'app-agent-detail',
    templateUrl: './agent-detail.component.html',
    styleUrls: ['./agent-detail.component.scss']
})
export class AgentDetailComponent implements OnInit, OnDestroy {

    agentModeString;

    constructor(
        public dialogRef: MatDialogRef<AgentDetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private agentService: AgentService,
        private alertService: ToastrService
    ) {
    }

    ngOnInit() {
        document.getElementById('defaultOpen').click();
    }

    openContent($event: any, tabName: string) {
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

    ngOnDestroy(): void {
        this.data = null;
    }

    newAgentInfo($event: any) {
        this.data = $event;
    }

    oncloseDialog() {
        this.dialogRef.close({data: this.agentModeString});
    }

    agentMode($event: any) {
        this.agentModeString = $event
    }
}

