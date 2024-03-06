import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbeddedAppOneComponent } from './embedded-app-one.component';

describe('EmbeddedAppOneComponent', () => {
  let component: EmbeddedAppOneComponent;
  let fixture: ComponentFixture<EmbeddedAppOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbeddedAppOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbeddedAppOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
