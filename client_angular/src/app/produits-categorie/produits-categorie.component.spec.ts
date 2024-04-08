import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitsCategorieComponent } from './produits-categorie.component';

describe('ProduitsCategorieComponent', () => {
  let component: ProduitsCategorieComponent;
  let fixture: ComponentFixture<ProduitsCategorieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitsCategorieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitsCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
