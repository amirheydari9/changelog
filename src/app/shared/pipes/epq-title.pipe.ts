import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'epqTitle'
})
export class EpqTitlePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {

            case 'E':
                return 'برونگرایی / درونگرایی';
                break;
            case 'N':
                return 'ثبات هیجانی / بی ثباتی هیجانی';
                break;
            case 'P':
                return 'روان رنجوری';
                break;
            case 'L':
                return ' وانمود مثبت';
                break;
        }
        return null;
    }

}
