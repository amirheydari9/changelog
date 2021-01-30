import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'martialStatus'
})
export class MartialStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {

      case 1:
        return 'مجرد';
        break;

      case 2:
        return 'نامزدی ناموفق';
        break;
      case 3:
        return 'طلاق گرفته';
        break;
      case 4:
        return 'همسر فوت شده';
        break;
    }
    return null;
  }

}
