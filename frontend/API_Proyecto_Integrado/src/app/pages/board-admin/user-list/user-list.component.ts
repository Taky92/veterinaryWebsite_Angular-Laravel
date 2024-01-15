import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.interface';
import { Pet } from 'src/app/models/pet.interface';
import { PetService } from 'src/app/services/pet/pet.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList: User[] = [];
  phoneFilter: string = '';

  constructor(private userService: UserService,
    private petService: PetService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => this.userList = users,
      error: err => console.log(err),
      complete: () => console.log('Petición completa')
    });
  }

  filterUsersByPhone(users: User[], phone?: string): User[] {
    if (phone) {
      return users.filter(user => user.phone.includes(phone));
    } else {
      return users;
    }
  }

  goBack(): void {
    window.history.back();
  }

  addPet(pet: Pet) {
    this.petService.storePet<Pet>(pet).subscribe(
      {
        next: (res) => {
          console.log('Mascota creada', res);
        },
        error: (err) => console.log(err)
      });
  }
}
