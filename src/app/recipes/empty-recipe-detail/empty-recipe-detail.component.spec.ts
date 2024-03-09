import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRecipeDetailComponent } from './empty-recipe-detail.component';

describe('EmptyRecipeDetailComponent', () => {
  let component: EmptyRecipeDetailComponent;
  let fixture: ComponentFixture<EmptyRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyRecipeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
