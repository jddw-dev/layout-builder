import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'col-element',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => TemplateElementPreviewComponent),
    DragDropModule,
  ],
  template: `
    <div class="col-element">
      <template-element-preview
        *ngFor="let templateElement of content"
        [element]="templateElement"
      ></template-element-preview>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .col-element {
        padding: 10px;
        margin: 4px;
        border: green solid 2px;
        border-radius: 0 8px 0 0;

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
