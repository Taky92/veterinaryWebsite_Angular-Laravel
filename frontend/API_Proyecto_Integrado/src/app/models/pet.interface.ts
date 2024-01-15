export interface Pet {
    idPet: number;
    name: string;
    species: 'dog' | 'cat';
    gender: 'male' | 'female';
    birthdate: string;
    photo: string;
    idUser: number;
    idVeterinary: number;
}