import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowElementComponent } from './row-element.component';

describe('RowElementComponent', () => {
  let component: RowElementComponent;
  let fixture: ComponentFixture<RowElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RowElementComponent]
    });
    fixture = TestBed.createComponent(RowElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
