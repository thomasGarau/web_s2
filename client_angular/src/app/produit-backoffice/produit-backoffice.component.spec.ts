import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitBackofficeComponent } from './produit-backoffice.component';

describe('ProduitBackofficeComponent', () => {
  let component: ProduitBackofficeComponent;
  let fixture: ComponentFixture<ProduitBackofficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitBackofficeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitBackofficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
