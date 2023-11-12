import { Component, Input } from '@angular/core';

@Component({
  selector: 'text-element',
  standalone: true,
  imports: [],
  template: ` <p class="text-element">{{ text }}</p> `,
  styles: [
    `
      .text-element {
        white-space: pre-wrap;
      }
    `,
  ],
})
export class TextElementComponent {
  @Input() text?: string;
}
