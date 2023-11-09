import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColElementComponent } from './col-element.component';

describe('ColElementComponent', () => {
  let component: ColElementComponent;
  let fixture: ComponentFixture<ColElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ColElementComponent]
    });
    fixture = TestBed.createComponent(ColElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
