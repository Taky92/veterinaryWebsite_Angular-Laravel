import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private title: Title, private router: Router) { }

  scrollTo(target: string) {
    if (this.router.url === '/home') {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      this.title.setTitle(target);
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          this.title.setTitle(target);
        }, 100);
      });
    }


  }
}
