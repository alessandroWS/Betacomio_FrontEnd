import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonarevisioneComponent } from './zonarevisione.component';

describe('ZonarevisioneComponent', () => {
  let component: ZonarevisioneComponent;
  let fixture: ComponentFixture<ZonarevisioneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZonarevisioneComponent]
    });
    fixture = TestBed.createComponent(ZonarevisioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
