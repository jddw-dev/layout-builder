import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutBuilderComponent } from './layout-builder.component';

describe('LayoutBuilderComponent', () => {
  let component: LayoutBuilderComponent;
  let fixture: ComponentFixture<LayoutBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutBuilderComponent]
    });
    fixture = TestBed.createComponent(LayoutBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
