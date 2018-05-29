import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesWorldMapComponent } from './countries-world-map.component';

describe('CountriesWorldMapComponent', () => {
  let component: CountriesWorldMapComponent;
  let fixture: ComponentFixture<CountriesWorldMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountriesWorldMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesWorldMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
