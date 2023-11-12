import { Component, Input } from '@angular/core';
import { TemplateElement } from '../core/models/template-element';

@Component({
  standalone: true,
  selector: 'layout-options',
  imports: [],
  template: `
    <h2 class="text-center">Options</h2>
    <h3 class="text-center">{{ selectedElement.type }}</h3>
  `,
  styles: [],
})
export class LayoutOptionsComponent {
  @Input({ required: true }) selectedElement: TemplateElement;
}
