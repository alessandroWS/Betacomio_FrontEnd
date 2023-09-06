import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkModalComponent } from './ok-modal.component';

describe('OkModalComponent', () => {
  let component: OkModalComponent;
  let fixture: ComponentFixture<OkModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OkModalComponent]
    });
    fixture = TestBed.createComponent(OkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
