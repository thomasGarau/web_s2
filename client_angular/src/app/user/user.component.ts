import { Component } from '@angular/core';
import {UserService} from '../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  utilisateurs: any[] = [];
  editingUserId: string | null = null;
  utilisateursBackup: any[] = [];

  constructor( private userService : UserService  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any[]) => {
        this.utilisateurs = data;
      },
      error: (error: any) => {
        console.error('Erreur lors de la récupération des utilisateurs', error);
      }
    });
  }

  modifierUtilisateur(user: any): void {
    user.enEdition = true;
    this.utilisateursBackup[user.id] = { ...user };
  }
  
  annulerEdition(user: any): void {
    this.utilisateurs[user.id] = this.utilisateursBackup[user.id];
    user.enEdition = false;
    this.loadUsers();
  }


  supprimerUtilisateur(user: any): void {
    this.userService.deleteUser(user.id_utilisateur).subscribe({
      next: (data: any) => {
        console.log('Utilisateur supprimé', data);
        this.loadUsers();
      },
      error: (error: any) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    });
  }

  saveUser(user: any): void {
    user.enEdition = false;
    this.userService.updateUser(user).subscribe({
      next: (data: any) => {
        console.log('Utilisateur mis à jour', data);
        this.loadUsers();
      },
      error: (error: any) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    });
  }

}
