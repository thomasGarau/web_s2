import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private appUrl = 'http://localhost:3001/user'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any[]>(`${this.appUrl}/getAll`, { headers }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            console.error('Erreur lors de la récupération des utilisateurs', error);
            throw error;
        })
        );

  }

  getUser(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token');

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = { id_user: id };
    return this.http.post<any>(`${this.appUrl}/get/`, body, { headers }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            console.error('Erreur lors de la récupération de l\'utilisateur', error);
            throw error;
        })
        );
      
  }

  updateUser(user: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = { id_user : user.id_utilisateur, nom :  user.nom, prenom :  user.prenom, email :  user.email, role : user.role };


    return this.http.post<any>(`${this.appUrl}/update/`, body, { headers }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
            throw error;
        })
        );
  }

  deleteUser(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const params = new HttpParams().set('id_user', id);

    return this.http.delete<any>(`${this.appUrl}/delete`, { headers, params }).pipe(
        map(response => {
            return response;
        }),
        catchError(error => {
            console.error('Erreur lors de la suppression de l\'utilisateur', error);
            throw error;
        })
        );
  }

}