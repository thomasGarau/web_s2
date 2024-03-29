import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  products = [
    { id: 1, name: 'Lait', price: 1.50, quantity: 10 },
    { id: 2, name: 'Pain', price: 0.90, quantity: 20 },
  ];

  constructor(private http: HttpClient) {}

}
