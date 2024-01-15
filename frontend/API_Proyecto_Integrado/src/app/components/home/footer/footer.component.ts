import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  icons = [
    { image: 'assets/logo/facebook.png', alt: 'Facebook' },
    { image: 'assets/logo/instagram.png', alt: 'Instagram' },
    { image: 'assets/logo/twitter.png', alt: 'Twitter' },
  ];
}
