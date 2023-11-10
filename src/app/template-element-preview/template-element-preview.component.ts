import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElement } from '../core/models/template-element';
import { ColElementComponent } from '../layout-elements/col-element.component';
import { MainElementComponent } from '../layout-elements/main-element.component';
import { RowElementComponent } from '../layout-elements/row-element.component';
import { BuilderFacade } from './../+state/builder.facade';

@Component({
  selector: 'template-element-preview',
  template: `
    <div
      [ngSwitch]="element.type"
      pDroppable
      (onDrop)="drop($event)"
      class="element-wrapper"
    >
      <main-element
        *ngSwitchCase="'main'"
        [content]="element.content"
      ></main-element>

      <row-element
        *ngSwitchCase="'row'"
        [content]="element.content"
      ></row-element>

      <col-element
        *ngSwitchCase="'column'"
        [content]="element.content"
      ></col-element>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .element-wrapper {
        display: contents;
      }
    `,
  ],
  standalone: true,
  imports: [
    CommonModule,
    MainElementComponent,
    RowElementComponent,
    ColElementComponent,
    DragDropModule,
  ],
})
export class TemplateElementPreviewComponent {
  @Input({ required: true }) element: TemplateElement;

  private builderFacade = inject(BuilderFacade);

  drop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.element.id) {
      this.builderFacade.drop(this.element.id);
    }
  }
}
