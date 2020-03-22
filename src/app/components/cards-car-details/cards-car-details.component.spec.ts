import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsCarDetailsComponent } from './cards-car-details.component';

describe('CardsCarDetailsComponent', () => {
  let component: CardsCarDetailsComponent;
  let fixture: ComponentFixture<CardsCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsCarDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
