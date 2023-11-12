import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

@Component({
  selector: 'hidden-element',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: ` <div class="hidden-element element-preview"></div> `,
  styles: [
    `
      .hidden-element {
        border: #cccccc dashed 2px;
        border-radius: 8px;
        margin: 10px 0;
        height: 30px;

        // opacity: 0;
      }
    `,
  ],
})
export class HiddenElementComponent {}
