import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'religion'
})
export class ReligionPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value) {

            case 1:
                return 'شیعه';
                break;
            case 2:
                return 'سنی';
                break;
            case 3:
                return 'مسیحی';
                break;
            case 4:
                return 'کلیمی';
                break;
            case 5:
                return 'زرتشتی';
                break;
            case 100:
                return 'سایر';
                break;
        }
        return null;
    }

}
