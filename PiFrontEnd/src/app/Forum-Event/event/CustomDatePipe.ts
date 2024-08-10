import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: any): any {
    if (!value) return '';

    // Convertir la valeur en objet Date
    const date = new Date(value);

    // Extraire le jour, le mois et l'année
    const day = date.getDate().toString().padStart(2, '0'); // Ajoute le '0' au début si nécessaire
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Ajoute le '0' au début si nécessaire
    const year = date.getFullYear();

    // Formater la date au format "jj/mm/yyyy"
    return `${day}/${month}/${year}`;
  }
}
