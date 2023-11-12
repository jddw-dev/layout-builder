import { NgSwitch, NgSwitchCase } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TemplateElement } from '../core/models/template-element';
import { BuilderFacade } from './../+state/builder.facade';
import { TextOptionsFormComponent } from './forms/text-options-form.component';
import { TitleOptionsFormComponent } from './forms/title-options-form.component';

@Component({
  standalone: true,
  selector: 'layout-options',
  imports: [
    TitleOptionsFormComponent,
    TextOptionsFormComponent,
    NgSwitch,
    NgSwitchCase,
  ],
  template: `
    <h2 class="text-center">Options</h2>
    <h3 class="text-center">
      {{ selectedElement.type }}
    </h3>

    <div [ngSwitch]="selectedElement.type">
      <title-options-form
        [title]="selectedElement.title!"
        (optionsSaved)="saveOptions($event)"
      ></title-options-form>

      <text-options-form
        *ngSwitchCase="'text'"
        [text]="selectedElement.text!"
        (optionsSaved)="saveOptions($event)"
      ></text-options-form>
    </div>
  `,
  styles: [],
})
export class LayoutOptionsComponent {
  @Input({ required: true }) selectedElement: TemplateElement;

  private builderFacade = inject(BuilderFacade);

  saveOptions(options: any): void {
    // TODO : les options ne s'update pas si le type ne change pas !!
    this.builderFacade.updateElement({
      ...this.selectedElement,
      ...options,
    });
  }
}
