import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  currentUrl: string | undefined;
  loggedIn: boolean | undefined;

  constructor(public authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
    
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.updateLoginStatus();
      this.currentUrl = event.url;
    });
  }

  updateLoginStatus(): void {
    // Implémentez la logique pour mettre à jour l'état ici, si nécessaire
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.loggedIn = isLoggedIn;
    });
  }

  showButton(buttonType: 'login' | 'register'): boolean {
    if (buttonType === 'login') {
      return this.currentUrl !== '/login';
    }
    if (buttonType === 'register') {
      return this.currentUrl !== '/register';
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
    
  }

}
