// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // BrowserModule pour le fonctionnement dans le navigateur
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Pour les formulaires
import { HttpClientModule } from '@angular/common/http'; // Pour les requêtes HTTP
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Pour les animations

import { DashboardRoutingModule } from './dashboard/dashboard-routing.module'; // Votre DashboardRoutingModule
import { AppComponent } from './app.component'; // Assurez-vous que ce chemin correspond à votre AppComponent
import { AuthModule } from './auth/auth.module'; // Votre AuthModule

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DashboardRoutingModule,
    AuthModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
