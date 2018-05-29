import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCarouselComponent } from './country-carousel.component';

describe('CountryCarouselComponent', () => {
  let component: CountryCarouselComponent;
  let fixture: ComponentFixture<CountryCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
