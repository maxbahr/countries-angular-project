import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesRegionComponent } from './countries-region.component';

describe('CountriesRegionComponent', () => {
  let component: CountriesRegionComponent;
  let fixture: ComponentFixture<CountriesRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
