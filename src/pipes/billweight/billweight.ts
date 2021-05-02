import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the BillweightPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'billweight',
})
export class BillweightPipe implements PipeTransform {
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
    convertstring=weightvalue.toString();
  }
    return convertstring;
  }
}
