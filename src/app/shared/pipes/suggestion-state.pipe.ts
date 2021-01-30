import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'suggestionState'
})
export class SuggestionStatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {

      case 1:
        return 'بدون وضعیت';
        break;
      case 2:
        return 'مشاهده شد';
        break;
      case 3:
        return 'درخواست آشنایی معلق';
        break;
      case 4:
        return 'درخواست آشنایی';
        break;
      case 5:
        return 'رد شد';
        break;
      case 6:
        return 'لغو شد';
        break;
      case 7:
        return 'تایید درخواست آشنایی';
        break;
      case 8:
        return 'درحال انجام';
        break;
      case 9:
        return 'به نتیجه رسید';
        break;
    }
    return 'ندارد';
  }

}
