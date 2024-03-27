import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule // Importer RouterTestingModule pour tester les routes
      ],
      providers: [
        AuthGuard // Fournir AuthGuard
      ]
    });
    guard = TestBed.inject(AuthGuard); // Injecter AuthGuard
  });

  it('should be created', () => {
    expect(guard).toBeTruthy(); // Tester si AuthGuard est créé correctement
  });
});
