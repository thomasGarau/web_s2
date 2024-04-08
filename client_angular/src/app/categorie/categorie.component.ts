import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategorieService } from '../services/categorie.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  categories: any[] = [];

  constructor(private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getALLCategories().subscribe({
      next: (data: any[]) => {
        this.categories = data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    });
  }
}
