import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'file'
})
export class FilePipe implements PipeTransform {

  transform(value: string): string {
    if (value.includes('image/png;base64')) {
      return 'image';
    } else if(value.includes('image/jpeg;base64')) {
      return 'image';
    } else if(value.includes('application/json;base64')) {
      return 'description';
    }else{
      return 'image_not_supported';
    }
  }
}
