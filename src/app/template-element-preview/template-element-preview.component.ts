import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, ElementRef, Input, inject } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { DropPosition } from '../core/models/drop-position';
import {
  TemplateElement,
  TemplateElementType,
} from '../core/models/template-element';
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
      [id]="element.id"
      [ngSwitch]="element.type"
      pDroppable
      (onDrop)="drop($event)"
      (onDragEnter)="dragEnter($event)"
      class="element-wrapper"
      [ngClass]="{ ghost: element.isGhost }"
      [style]="getStyles()"
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

      .element-wrapper {
        .ghost {
          background: #000000;
          opacity: 0.3;
        }
      }
    `,
  ],
  standalone: true,
})
export class TemplateElementPreviewComponent {
  @Input({ required: true }) element: TemplateElement;

  private builderFacade = inject(BuilderFacade);
  private elementRef = inject(ElementRef);

  getStyles(): any {
    const styles: any = {};

    this.element.styles?.forEach((style) => {
      styles[style.property] = style.value;
    });

    return styles;
  }

  drop(event: any) {
    // Prevent drop on itself
    if (this.element.isGhost) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Row cannot accept drop
    if (this.element.type === TemplateElementType.ROW) {
      return;
    }

    const insertAfterId = this.getInsertAfterId(event);

    if (this.element.id) {
      this.builderFacade.drop(this.element.id, insertAfterId);
    }
  }

  // TODO : remove ?
  private getInsertPosition(event: any): DropPosition {
    const dropPosition = { x: event.clientX, y: event.clientY };
    const elementPosition =
      this.elementRef.nativeElement.getBoundingClientRect();

    const center = {
      x: elementPosition.left + elementPosition.width / 2,
      y: elementPosition.top + elementPosition.height / 2,
    };

    return dropPosition.y < center.y ? DropPosition.TOP : DropPosition.BOTTOM;
  }

  private getInsertAfterId(event: any): string | null {
    const dropPosition = { x: event.clientX, y: event.clientY };

    // Get element children
    const children =
      this.elementRef.nativeElement.children[0]?.children[0]?.children[0]
        ?.children;

    let insertAfterId: string | null = null;
    if (children) {
      for (const child of children) {
        const childElement = child.children[0];
        if (childElement.className.includes('ghost')) {
          // Ignore ghost element
          continue;
        }

        const childId = childElement.id;
        const childPosition = childElement.getBoundingClientRect();

        if (childPosition.bottom <= dropPosition.y) {
          insertAfterId = childId;
        }
      }
    }

    return insertAfterId;
  }

  dragEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.element.isGhost || this.element.type === TemplateElementType.ROW) {
      return;
    }

    const insertAfterId = this.getInsertAfterId(event);
    if (this.element.id) {
      this.builderFacade.displayGhost(this.element.id, insertAfterId);
    }
  }
}
