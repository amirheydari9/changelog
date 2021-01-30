import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-extra-info',
    templateUrl: './extra-info.component.html',
    styleUrls: ['./extra-info.component.scss']
})
export class ExtraInfoComponent implements OnInit {

    @Input() userData: any;
    @Input() isTebyanAdmin: boolean;
    @Output() formHasError: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() userInfoChanged: EventEmitter<any> = new EventEmitter<any>();

    extraInfoForm: FormGroup;

    constructor() {
    }

    ngOnInit() {

        this.initForm();


        if (!this.isTebyanAdmin) {
            this.extraInfoForm.disable();
        }

        this.extraInfoForm.valueChanges.subscribe(() => {
            if (this.extraInfoForm.invalid) {
                this.formHasError.emit(true);
            }
            if (this.extraInfoForm.valid) {
                this.formHasError.emit(false);
                this.userInfoChanged.emit({
                    scientificSkills: this.extraInfoForm.controls.scientificSkills.value,
                    artisticSkills: this.extraInfoForm.controls.artisticSkills.value,
                    technicalSkills: this.extraInfoForm.controls.technicalSkills.value,
                    athleticSkills: this.extraInfoForm.controls.athleticSkills.value,
                    interestsAndHobbies: this.extraInfoForm.controls.interestsAndHobbies.value,
                    aboutMe: this.extraInfoForm.controls.aboutMe.value,
                })
            }
        });
    }

    initForm() {
        this.extraInfoForm = new FormGroup({
            scientificSkills: new FormControl(this.userData.applicant.scientificSkills),
            artisticSkills: new FormControl(this.userData.applicant.artisticSkills),
            technicalSkills: new FormControl(this.userData.applicant.technicalSkills),
            athleticSkills: new FormControl(this.userData.applicant.athleticSkills),
            interestsAndHobbies: new FormControl(this.userData.applicant.interestsAndHobbies),
            aboutMe: new FormControl(this.userData.applicant.aboutMe),
        })
    }
}
