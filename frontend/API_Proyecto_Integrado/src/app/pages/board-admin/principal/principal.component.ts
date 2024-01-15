import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/services/dates/dates.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Dates } from 'src/app/models/dates.interface';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  veterinaryName: string = '';
  veterinaryId: number = 0;
  datesList: Dates[] = [];

  constructor(private dateService: DatesService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => {
      this.veterinaryName = user.name;
      this.veterinaryId = user.idVeterinary;
      this.dateService.getDatesByVet(user.idVeterinary).subscribe(dates => {
        this.datesList = dates;
      });
    });

  }

  onDateAdded(event: boolean) {
    if (event) {
      this.dateService.getDatesByVet(this.veterinaryId).subscribe(dates => {
        this.datesList = dates;
      });
    }
  }

}
