import {AbstractControl} from '@angular/forms';

export function validNationalId(control: AbstractControl): { [key: string]: boolean | null } {
    if (control.value) {
        if (!/^\d{10}$/.test(control.value)
            || control.value === '0000000000'
            || control.value === '1111111111'
            || control.value === '2222222222'
            || control.value === '3333333333'
            || control.value === '4444444444'
            || control.value === '5555555555'
            || control.value === '6666666666'
            || control.value === '7777777777'
            || control.value === '8888888888'
            || control.value === '9999999999') {
            return {'validNationalId': true}
        }
        const check = +control.value[9];
        let sum = 0;
        for (let i = 0; i < 9; ++i) {
            sum += +control.value[i] * (10 - i);
        }
        sum %= 11;
        if (!((sum < 2 && check == sum) || (sum >= 2 && check + sum == 11))) {
            return {'validNationalId': true};
        }
    }
    return null;
}

export function validMobile(control: AbstractControl): { [key: string]: boolean | null } {

    if (control.value) {
        if (!/^09[0-9]{9}$/.test(control.value)) {
            return {'validMobile': true}
        }
    }
    return null;
}

export function validTel(control: AbstractControl): { [key: string]: boolean | null } {

    if (control.value) {
        if (!/^0\d{10}$/.test(control.value)) {
            return {'validTel': true}
        }
    }
    return null;
}
