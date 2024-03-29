import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule }  from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((success: boolean) => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        console.error('Login failed');
      }
    });
  }
}
