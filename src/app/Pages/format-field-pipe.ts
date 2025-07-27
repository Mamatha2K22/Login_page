import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatField'
})
export class FormatFieldPipe implements PipeTransform {

 transform(value: any, key: any): any {
    
    if (typeof key === 'string' && key.toLowerCase() === 'title') {
      return (value as string).toUpperCase();
    }
    return value;
  }

}
