import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit, OnDestroy {
  items = [
    { image: '../../../../assets/images/carrousel/pet1.jpg', alt: 'Pet 1', description: 'Consultas Gatunas' },
    { image: '../../../../assets/images/carrousel/pet2.jpg', alt: 'Pet 2', description: 'Consultas Perrunas' },
    { image: '../../../../assets/images/carrousel/pet3.jpg', alt: 'Pet 3', description: 'Todo por su bienestar' },
    { image: '../../../../assets/images/carrousel/pet4.jpg', alt: 'Pet 4', description: 'Profesionales en cirugías' },
  ];

  currentIndex = 0;
  translateValue = 0;
  autoPlay = true;
  intervalDuration = 7000;

  private autoPlaySubscription: Subscription | undefined;

  ngOnInit(): void {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    if (this.autoPlaySubscription) {
      this.autoPlaySubscription.unsubscribe();
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.translateValue += this.getItemWidth();
    }
  }

  next(): void {
    if (this.currentIndex < this.items.length - 1) {
      this.currentIndex++;
      this.translateValue -= this.getItemWidth();
    } else {
      this.currentIndex = 0;
      this.translateValue = 0;
    }
  }

  goTo(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.currentIndex = index;
      this.translateValue = -this.currentIndex * this.getItemWidth();
    }
  }

  private getItemWidth(): number {
    const item = document.querySelector('.carousel-item');
    return item ? item.clientWidth : 0;
  }

  private startAutoPlay(): void {
    this.autoPlaySubscription = interval(this.intervalDuration).subscribe(() => {
      this.next();
    });
  }
}
