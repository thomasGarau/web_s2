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
  categoriesBackup: any[] = [];

  constructor(private categorieService: CategorieService, private authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {
    if (!this.authService.isAdmin()){
      this.router.navigate(['/categorie']);
    }
    else {
      this.loadCategories();
    }
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

  modifierCategorie(categorie: any): void {
    categorie.enEdition = true;
    this.categoriesBackup[categorie.id_categorie] = { ...categorie }; 
  }
  
  sauvegarderCategorie(categorie: any): void {
    categorie.enEdition = false;
    this.categorieService.updateCategorie(categorie).subscribe({
      next: (data: any) => {
        console.log('Catégorie mise à jour', data);
        this.loadCategories();
      },
      error: (error: any) => {
        console.error('Erreur lors de la mise à jour de la catégorie', error);
      }
    });
  }
  
  annulerEdition(categorie: any): void {
    this.categories[categorie.id_categorie] = { ...this.categoriesBackup[categorie.id_categorie] };
    categorie.enEdition = false;
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

}
