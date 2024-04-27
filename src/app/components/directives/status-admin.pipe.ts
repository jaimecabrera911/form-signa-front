import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusAdmin'
})
export class StatusAdminPipe implements PipeTransform {

  transform(value: any): any {
    return value ? 'Activo' : 'Inactivo';;
  }

}
