import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="testForm" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="testInput">
      <button type="submit">Submit</button>
    </form>
    <p>Value: {{ testForm.value | json }}</p>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client_angular';
  testForm = new FormGroup({
    testInput: new FormControl('', Validators.required)
  });

  onSubmit(): void {
    console.log(this.testForm.value);
  }
}
