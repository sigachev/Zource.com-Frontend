import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTopbarComponent } from './category-topbar.component';

describe('ProductsTopbarComponent', () => {
  let component: CategoryTopbarComponent;
  let fixture: ComponentFixture<CategoryTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
