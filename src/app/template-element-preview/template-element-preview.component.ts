import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, ElementRef, Input, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { DropPosition } from '../core/models/drop-position';
import { TemplateElement } from '../core/models/template-element';
import { ColElementComponent } from '../layout-elements/col-element.component';
import { MainElementComponent } from '../layout-elements/main-element.component';
import { RowElementComponent } from '../layout-elements/row-element.component';
import { BuilderFacade } from './../+state/builder.facade';

@Component({
  imports: [
    MainElementComponent,
    RowElementComponent,
    ColElementComponent,
    DragDropModule,
    NgClass,
    NgSwitch,
    NgSwitchCase,
  ],
  selector: 'template-element-preview',
  template: `
    <div
      [ngSwitch]="element.type"
      pDroppable
      (onDrop)="drop($event)"
      (onDragEnter)="dragEnter($event)"
      (onDragLeave)="dragLeave($event)"
      class="element-wrapper"
      [ngClass]="{ 'drag-over': hasDragOver }"
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
        position: relative;
      }
    `,
  ],
  standalone: true,
})
export class TemplateElementPreviewComponent {
  @Input({ required: true }) element: TemplateElement;

  private builderFacade = inject(BuilderFacade);

  private elementRef = inject(ElementRef);

  hasDragOver = false;

  drop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    const insertPosition = this.getInsertPosition(event);

    if (this.element.id) {
      this.builderFacade.drop(this.element.id, insertPosition);
    }
  }

  private getInsertPosition(event: any): DropPosition {
    const dropPosition = { x: event.clientX, y: event.clientY };
    const elementPosition =
      this.elementRef.nativeElement.getBoundingClientRect();

    const center = {
      x: elementPosition.left + elementPosition.width / 2,
      y: elementPosition.top + elementPosition.height / 2,
    };

    return {
      x: dropPosition.x > center.x ? 'right' : 'left',
      y: dropPosition.y > center.y ? 'bottom' : 'top',
    };
  }

  dragEnter(event: any) {
    this.hasDragOver = true;
  }

  dragLeave(event: any) {
    this.hasDragOver = false;
  }
}
