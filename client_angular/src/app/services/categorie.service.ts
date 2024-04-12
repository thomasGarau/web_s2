import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategorieService {
  private appUrl = 'http://localhost:3001/categorie';
  
  constructor(private http: HttpClient) {}

  getALLCategories(): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get<any[]>(`${this.appUrl}/all`, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la récupération des catégories', error);
        throw error;
      })
    );
  }

  updateCategorie(categorie: any): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const body = {id : categorie.id_categorie ,label :categorie.label};

    console.log('body', body);
    return this.http.put<any>(`${this.appUrl}/update`, body, { headers }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la mise à jour de la catégorie', error);
        throw error;
      })
    );
  }

  deleteCategorie(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const params = new HttpParams().set('id_categorie', id);

    return this.http.delete<any>(`${this.appUrl}/delete`, { headers, params }).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        // Gestion des erreurs
        console.error('Erreur lors de la suppression de la catégorie', error);
        throw error;
      })
    );
  }
}
