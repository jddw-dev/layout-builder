import { Component, Input } from '@angular/core';

@Component({
  selector: 'title-element',
  standalone: true,
  imports: [],
  template: ` <h2 class="title-element">{{ title }}</h2> `,
  styles: [``],
})
export class TitleElementComponent {
  @Input() title?: string;
}
