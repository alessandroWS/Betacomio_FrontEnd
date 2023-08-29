import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageComponent } from './singlepage.component';

describe('SinglepageComponent', () => {
  let component: SinglepageComponent;
  let fixture: ComponentFixture<SinglepageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SinglepageComponent]
    });
    fixture = TestBed.createComponent(SinglepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
