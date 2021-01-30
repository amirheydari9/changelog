import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {

      case 1:
        return 'مرد';
        break;

      case 2:
        return 'زن';
        break;
    }

    return null;
  }

}
