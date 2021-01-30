import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, NgModel} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
    selector: 'app-select-check-all',
    templateUrl: './select-check-all.component.html',
    styleUrls: ['./select-check-all.component.scss'],
})
export class SelectCheckAllComponent {
    @Input() model: FormControl;
    @Input() values = [];
    @Input() text = 'انتخاب همه';

    isChecked(): boolean {

        return this.model.value && this.values.length
            && this.model.value.length === this.values.length;
    }

    isIndeterminate(): boolean {
        return this.model.value && this.values.length && this.model.value.length
            && this.model.value.length < this.values.length;
    }

    toggleSelection(change: MatCheckboxChange): void {
        if (change.checked) {
            this.model.patchValue(this.values);
        } else {
            this.model.setValue([]);
        }
    }
}
