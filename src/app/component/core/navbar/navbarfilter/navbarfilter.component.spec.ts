import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarfilterComponent } from './navbarfilter.component';

describe('NavbarfilterComponent', () => {
  let component: NavbarfilterComponent;
  let fixture: ComponentFixture<NavbarfilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarfilterComponent]
    });
    fixture = TestBed.createComponent(NavbarfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
