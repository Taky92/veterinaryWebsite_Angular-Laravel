import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: string): string {
    const translations: { [key: string]: string } = {
      dog: 'Perro',
      cat: 'Gato',
      female: 'Hembra',
      male: 'Macho',
      name: 'Nombre',
      start_date: 'Fecha de inicio',
      end_date: 'Fecha de fin',
      treatment: 'Tratamiento',
      date: 'Fecha',
      description: 'Descripción',
      pdf: 'PDF',
      expiration: 'Fecha de expiración',
      reason: 'Asunto',
      time: 'Hora',
      idPet: 'Mascota',
      actions: ' ',
    };

    if (translations[value]) {
      return translations[value];
    }

    return value;
  }

}
