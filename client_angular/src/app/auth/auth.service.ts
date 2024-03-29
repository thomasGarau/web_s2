import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authUrl = 'http://localhost:3001/user';
  private loggedInStatus = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient, private router: Router) {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedInStatus.next(this.hasToken());
    }
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password })
      .pipe(
        map(response => {
          localStorage.setItem('auth_token', response.token);
          this.loggedInStatus.next(true);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  register(email: string, password: string, name: string, firstname: string): Observable<boolean> {
    return this.http.post<any>(`${this.authUrl}/register`, { email, password, name, firstname })
      .pipe(
        map(response => {
          localStorage.setItem('auth_token', response.token);
          this.loggedInStatus.next(true);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.loggedInStatus.next(false);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInStatus.asObservable();
  }
}
