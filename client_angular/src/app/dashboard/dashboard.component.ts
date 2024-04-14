import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CategorieService } from '../services/categorie.service';
import { AuthService } from '../auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  categories: any[] = [];
  nouvelleCategorie: any = {};
  loading :boolean = false;

  constructor(private categorieService: CategorieService, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getALLCategories().subscribe({
      next: (data: any[]) => {
        data.sort((a, b) => a.id_categorie - b.id_categorie);
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    });
  }

  onFileSelected(event: any, categorie: any): void {
    categorie.file = event.target.files[0];
  }

  ajouterNouvelleCategorie(categorie: any): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('label', categorie.label);
    if (categorie.file) {
      formData.append('url', categorie.file);
    }

    this.categorieService.saveCategorieWithImage(formData).subscribe({
      next: (data) => {
        console.log('Nouvelle catégorie ajoutée avec succès', data);
        this.categories.push(data); 
        this.nouvelleCategorie = {}; 
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la nouvelle catégorie', error);
      }
    });
  }

  modifierCategorie(categorie: any): void {
    categorie.enEdition = true;
  }
  
  sauvegarderCategorie(categorie: any): void {
    this.loading = true;
    const formData = new FormData();
    formData.append('label', categorie.label);
    formData.append('id_categorie', categorie.id_categorie);
  
    if (categorie.file) {
      formData.append('url', categorie.file);
    }
  
    this.categorieService.updateCategorie(formData).subscribe({
      next: (data: any) => {
        console.log('Catégorie mise à jour', data);
        this.loadCategories();
        this.loading = false;
        categorie.enEdition = false;  // Déplacer ici pour assurer la cohérence en cas de succès de la requête
      },
      error: (error: any) => {
        console.error('Erreur lors de la mise à jour de la catégorie', error);
        categorie.enEdition = true;  // Permettre à l'utilisateur de réessayer
      }
    });
  }
  
  
  annulerEdition(categorie: any): void {
    this.loadCategories();
  }

  supprimerCategorie(categorie: any): void {
    this.categorieService.deleteCategorie(categorie.id_categorie).subscribe({
      next: (data: any) => {
        console.log('Catégorie supprimée', data);
        this.loadCategories();
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression de la catégorie', error);
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
