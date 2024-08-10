import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, format: string = 'dd/MM/yyyy HH:mm:ss'): any {
    const datePipe = new DatePipe('en-US');
    const formattedValue = datePipe.transform(value, format);
    return formattedValue;
  }

}
