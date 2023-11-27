import { Component } from '@angular/core';

@Component({
  selector: 'sheet-element',
  standalone: true,
  template: ` <div class="sheet-element"><strong>Onglet</strong></div> `,
  styles: [
    `
      .sheet-element {
        border: 2px solid #000000;
        min-height: 100px;
        width: 100%;
        padding: 2px;
      }
    `,
  ],
})
export class SheetElementComponent {}
