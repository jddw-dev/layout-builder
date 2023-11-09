import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateElementsListComponent } from './template-elements-list.component';

describe('TemplateElementsListComponent', () => {
  let component: TemplateElementsListComponent;
  let fixture: ComponentFixture<TemplateElementsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TemplateElementsListComponent]
    });
    fixture = TestBed.createComponent(TemplateElementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
