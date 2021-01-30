import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from '../../../../services/common/common.service';
import {AgentService} from '../../../../services/agent/agent.service';
import {ToastrService} from 'ngx-toastr';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-upload-agent-picture',
    templateUrl: './upload-agent-picture.component.html',
    styleUrls: ['./upload-agent-picture.component.scss']
})
export class UploadAgentPictureComponent implements OnInit {

    @Input() agentData: any;
    imagePath = '';

    constructor(
        private commonService: CommonService,
        private agentService: AgentService,
        private alertService: ToastrService
    ) {
    }

    ngOnInit() {
        if (this.agentData) {
            this.imagePath = this.agentData.agent.pictureFileUrlPath;
        }
    }

    onFileInput($event: Event) {

        this.commonService.uploadFile($event.target['files'][0]).subscribe((data) => {
            this.agentService.changePictureAgent(this.agentData.agent.id, data.data.fileId).subscribe(
                () => {
                    this.alertService.success('آپلود تصویر با موفقیت انجام شد');
                    this.imagePath = environment.imageUrl + data.data.fileId;
                }, error => this.alertService.error('آپلود تصویر انجام نشد')
            );
        }, error => this.alertService.error('آپلود تصویر انجام نشد'));
    }

    fileInputHandle($event: MouseEvent) {
        document.getElementById('fileInput').click();
    }


}
