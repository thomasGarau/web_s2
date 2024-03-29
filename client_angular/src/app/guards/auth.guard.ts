import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isLoggedIn().pipe(
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        } else {
          // Redirige vers la page de connexion si non authentifié, avec l'URL de retour
          return this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url }});
        }
      }),
      catchError(() => {
        // Gestion des erreurs, redirige par défaut vers la page de connexion
        return of(this.router.createUrlTree(['/login']));
      })
    );
  }
}
