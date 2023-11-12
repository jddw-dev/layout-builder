import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'row-element',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => TemplateElementPreviewComponent),
    DragDropModule,
  ],
  template: `
    <div class="row-element  element-preview">
      <template-element-preview
        *ngFor="let templateElement of content"
        [element]="templateElement"
      ></template-element-preview>
    </div>
  `,
  styles: [
    `
      .row-element {
        padding: 1px;
        border: #cccccc dashed 2px;
        border-radius: 8px;

        display: flex;
        margin: 50px 0;
      }
    `,
  ],
})
export class RowElementComponent {
  @Input() content?: TemplateElement[];
}
