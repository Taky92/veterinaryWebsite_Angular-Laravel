import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string): string {
    const words = value.split(' ');
    const truncatedText = words.slice(0, 5);

    if (words.length > 5) {
      return truncatedText.join(' ') + '...';
    }

    return value;
  }

}
