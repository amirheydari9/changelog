import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mateState'
})
export class MateStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {

      case 1:
        return 'ثبت نام شد';
        break;

      case 2:
        return 'تایید شد';
        break;
      case 3:
        return 'درانتظار تایید';
        break;
      case 4:
        return 'مشغول';
        break;
      case 5:
        return 'تعلیق';
        break;
      case 6:
        return 'غیرفعال';
        break;
      case 7:
        return 'آشنایی با فرد دیگر';
        break;
      case 8:
        return 'ازدواج کرد';
        break;
    }

    return null;
  }

}
