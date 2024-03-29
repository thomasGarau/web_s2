import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReverseAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    console.log('ReverseAuthGuard#canActivate called');
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/dashboard']);
          return false;
        }
        return true;
      }),
      catchError(() => of(true)) // En cas d'erreur, permet l'accès
    );
  }
}
