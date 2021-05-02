import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the WeightPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'weightapd',
})
export class WeightapdPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(weightvalue: number,type:number) {
    let convertstring="";
    if(type==1){
    if(weightvalue<1){
      convertstring=weightvalue+"gm";
    }
    else{
      convertstring=weightvalue+"kg";
    }
  }
  else{
    // convertstring=weightvalue.toString();
    convertstring=weightvalue.toString();

  }
    return convertstring;
  }
}
