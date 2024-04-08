import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-produit-categorie',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './produits-categorie.component.html',
  styleUrls: ['./produits-categorie.component.scss']
})
export class ProduitsCategorieComponent implements OnInit {
  produits: any[] = [];
  idCategorie: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private produitService: ProduitService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idCategorie = params.get('id');
      if (this.idCategorie) {
        this.loadProduitsParCategorie(this.idCategorie);
      }
    });
  }

  loadProduitsParCategorie(idCategorie: string): void {
    this.produitService.getProduitsParCategorie(idCategorie).subscribe({
      next: (data: any[]) => {
        this.produits = data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des produits', error);
      }
    });
  }
}
