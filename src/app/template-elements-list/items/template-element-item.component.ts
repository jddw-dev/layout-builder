import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElementItem } from '../../core/models/template-element-item';

@Component({
  selector: 'template-element-item',
  standalone: true,
  imports: [DragDropModule, NgIf],
  template: `
    <div
      class="dragdrop-element"
      pDraggable
      (onDragStart)="onDragStart.emit()"
      (onDragEnd)="onDragEnd.emit()"
    >
      <img *ngIf="element.image" [src]="element.image" class="display-image" />
      <span *ngIf="!element.image" class="display-name">{{
        element.displayName
      }}</span>
    </div>
  `,
  styles: [
    `
      .dragdrop-element {
        display: block;
        margin: 20px auto;
        cursor: pointer;

        &:active {
          z-index: 1000;
        }

        .display-image {
          display: block;
          width: 100%;
          height: auto;
        }

        .display-name {
          display: block;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    `,
  ],
})
export class TemplateElementItemComponent {
  @Input({ required: true }) element: TemplateElementItem;
  @Output() onDragStart: EventEmitter<void> = new EventEmitter<void>();
  @Output() onDragEnd: EventEmitter<void> = new EventEmitter<void>();
}
