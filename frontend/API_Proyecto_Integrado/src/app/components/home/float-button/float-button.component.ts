import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.scss']
})
export class FloatButtonComponent {

  constructor(private title: Title) { }

  scrollToTop() {

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.title.setTitle('home');
  }

}
