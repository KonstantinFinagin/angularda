import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zerotodashtransform'
})
export class ZerotodashtransformPipe implements PipeTransform {

  transform(value: any): any {
    return value.toString().replace('0', '-');
  }
}
