import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], searchTerm: string): any[] {
    if (!value) return [];
    if (!searchTerm) return value;
    
    searchTerm = searchTerm.toLowerCase();

    return value.filter((a: any) => {
      // Filtrer uniquement les chaînes de caractères
      return Object.keys(a).some(key => {
        return String(a[key]).toLowerCase().includes(searchTerm);
      });
    });
  }
}
