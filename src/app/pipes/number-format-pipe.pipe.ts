import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatPipe'
})
export class NumberFormatPipePipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toFixed(1);
  }

}
