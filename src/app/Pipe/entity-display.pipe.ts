import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'entityDisplay'
})
export class EntityDisplayPipe implements PipeTransform {
  transform(value: any): string {
    // Check if value is a string, return as is
    if (typeof value === 'string') {
      return value;
    }
    // If value is an object and has a name property, return the name
    if (value && typeof value === 'object' && value.name) {
      return value.name;
    }
    // Default return value if neither conditions are met
    return 'Unknown';
  }
}