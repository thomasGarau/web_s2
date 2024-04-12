import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private appUrl = 'http://localhost:3001/product'; // Assurez-vous que cette URL est correcte

  constructor(private http: HttpClient) {}

  getProduitsParCategorie(idCategorie: string): Observable<any[]> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Pour POST, les données sont envoyées dans le corps de la requête
    const body = { id_categorie: idCategorie };
  
    return this.http.post<any[]>(`${this.appUrl}/all`, body, { headers }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des produits de la catégorie', error);
        throw error;
      })
    );
  }

  getProduit(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    // Pour POST, les données sont envoyées dans le corps de la requête
    const body = { id_produit: id };
  
    return this.http.post<any>(`${this.appUrl}/product`, body, { headers }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération du produit', error);
        throw error;
      })
    );
  }

  addProduit(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

  
    return this.http.post<any>(`${this.appUrl}/add`, formData, { headers }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de l\'ajout du produit', error);
        throw error;
      })
    );
  }

  updateProduit(formData: FormData): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    return this.http.put<any>(`${this.appUrl}/update`, formData, { headers }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la mise à jour du produit', error);
        throw error;
      })
    );
  }

  deleteProduit(id: number): Observable<any> {
    const token = localStorage.getItem('auth_token');
    
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
  
    const params = new HttpParams().set('id_produit', id);
  
    return this.http.delete<any>(`${this.appUrl}/delete`, { headers, params }).pipe(
      map(response => {
        console.log('Réponse de la requête', response);
        return response;
      }),
      catchError(error => {
        console.error('Erreur lors de la suppression du produit', error);
        throw error;
      })
    );
  }
  
  
  

  // Ajoutez ici d'autres méthodes pour interagir avec l'API des produits selon vos besoins
}
