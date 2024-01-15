import { Component } from '@angular/core';

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent {

  cards = [
    { image: 'assets/images/benefits/benefit-1.png', title: 'Medicina Perruna' },
    { image: 'assets/images/benefits/benefit-2.png', title: 'Medicina Gatuna' },
    { image: 'assets/images/benefits/benefit-3.png', title: 'Diagnostico' },
    { image: 'assets/images/benefits/benefit-4.png', title: 'Cirugía' },
    { image: 'assets/images/benefits/benefit-5.png', title: 'Urgencias 24h' },
    { image: 'assets/images/benefits/benefit-6.png', title: 'Hospitalización' },
    { image: 'assets/images/benefits/benefit-7.png', title: 'Peluquería' },
    { image: 'assets/images/benefits/benefit-8.png', title: 'Vacunación' },
  ];

  constructor() { }

}
