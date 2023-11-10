import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'main-element',
  standalone: true,
  imports: [CommonModule, forwardRef(() => TemplateElementPreviewComponent)],
  template: `
    <div class="main-element element-preview">
      <template-element-preview
        *ngFor="let templateElement of content"
        [element]="templateElement"
      ></template-element-preview>
    </div>
  `,
  styles: [
    `
      .main-element {
        width: 100%;
        padding: 10px;
        border: #000000 dashed 2px;
        border-radius: 2px;
      }
    `,
  ],
})
export class MainElementComponent {
  @Input() content?: TemplateElement[];
}
