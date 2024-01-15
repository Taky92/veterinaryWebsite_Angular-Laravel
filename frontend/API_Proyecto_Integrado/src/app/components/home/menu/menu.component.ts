import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  userType: string = '';
  authenticated: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private authService: AuthService, private router: Router, private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {

    this.authService.getUserType().subscribe((userType: string) => {
      this.userType = userType;
    });

    this.authService.isAuthenticated().subscribe((authenticated: boolean) => {
      this.authenticated = authenticated;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
