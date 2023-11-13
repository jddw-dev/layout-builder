import { NgFor } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'col-element',
  standalone: true,
  imports: [NgFor, forwardRef(() => TemplateElementPreviewComponent)],
  template: `
    <div class="col-element element-preview">
      <template-element-preview
        *ngFor="let templateElement of content"
        [element]="templateElement"
      ></template-element-preview>
    </div>
  `,
  styles: [
    `
      .col-element {
        display: block;
        min-height: 100px;

        flex: 1;
      }
    `,
  ],
})
export class ColElementComponent {
  @Input() content?: TemplateElement[];
}
