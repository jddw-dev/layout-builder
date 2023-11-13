import { Component } from '@angular/core';

@Component({
  selector: 'divider-component',
  standalone: true,
  template: ` <div class="divider-component"></div> `,
  styles: [
    `
      .divider-component {
        display: block;
        height: 2px;
        background: #cccccc;
        margin: 10px 0;
      }
    `,
  ],
})
export class DividerElementComponent {}
