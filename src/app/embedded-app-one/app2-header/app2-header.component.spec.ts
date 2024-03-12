import { ComponentFixture, TestBed } from '@angular/core/testing';

import { App2HeaderComponent } from './app2-header.component';

describe('App2HeaderComponent', () => {
  let component: App2HeaderComponent;
  let fixture: ComponentFixture<App2HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ App2HeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(App2HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
