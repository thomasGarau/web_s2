// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // BrowserModule pour le fonctionnement dans le navigateur
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Pour les formulaires
import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Pour les animations

import { AppComponent } from './app.component'; // Assurez-vous que ce chemin correspond à votre AppComponent
import { AuthModule } from './auth/auth.module'; // Votre AuthModule

@NgModule({
  declarations: [
    AppComponent, // Votre composant racine doit être déclaré ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule, // Importez votre AuthModule pour inclure LoginComponent et RegisterComponent
    // Si vous avez un AppRoutingModule, importez-le ici également
  ],
  providers: [],
  bootstrap: [AppComponent] // Démarre avec le AppComponent
})
export class AppModule { }
