import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElementItem } from '../../core/models/template-element-item';

@Component({
  selector: 'template-element-item',
  standalone: true,
  imports: [DragDropModule],
  template: `
    <button
      class="btn btn-dark dragdrop-element"
      pDraggable
      (onDragStart)="dragStart()"
    >
      {{ element.displayName }}
    </button>
  `,
  styles: [
    `
      button {
        display: block;
        margin: 10px auto;
      }
      .dragdrop-element {
        &:active {
          z-index: 1000;
        }
      }
    `,
  ],
})
export class TemplateElementItemComponent {
  @Input({ required: true }) element: TemplateElementItem;
  @Output() onDragStart: EventEmitter<void> = new EventEmitter<void>();

  dragStart(): void {
    this.onDragStart.emit();
  }
}
