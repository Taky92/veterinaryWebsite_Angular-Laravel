import { Pipe, PipeTransform } from '@angular/core';
import { PetService } from '../services/pet/pet.service';

@Pipe({
  name: 'namePet'
})
export class NamePetPipe implements PipeTransform {

  constructor(private petService: PetService) { }

  async transform(value: number): Promise<string | undefined> {
    if (!value) {
      return value.toString();
    }

    try {
      const petName = await this.petService.getPetName<string>(value).toPromise();
      return petName;
    } catch (error) {
      console.log(error);
      return undefined;
    }

  }

}
