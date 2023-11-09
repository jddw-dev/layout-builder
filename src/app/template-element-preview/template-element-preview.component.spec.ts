import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateElementPreviewComponent } from './template-element-preview.component';

describe('TemplateElementPreviewComponent', () => {
  let component: TemplateElementPreviewComponent;
  let fixture: ComponentFixture<TemplateElementPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateElementPreviewComponent]
    });
    fixture = TestBed.createComponent(TemplateElementPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
