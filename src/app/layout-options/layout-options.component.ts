import { NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { TemplateElement } from '../core/models/template-element';
import { BuilderFacade } from './../+state/builder.facade';
import { AccordionOptionsFormComponent } from './forms/accordion-options-form.component';
import { ContainersFormComponent } from './forms/containers-form.component';
import { TextOptionsFormComponent } from './forms/text-options-form.component';
import { TitleOptionsFormComponent } from './forms/title-options-form.component';

@Component({
  standalone: true,
  selector: 'layout-options',
  imports: [
    TitleOptionsFormComponent,
    TextOptionsFormComponent,
    ContainersFormComponent,
    AccordionOptionsFormComponent,
    NgIf,
  ],
  template: `
    <h2 class="text-center">Options</h2>
    <h3 class="text-center">
      {{ selectedElement.type }}
    </h3>

    <div>
      <title-options-form
        *ngIf="selectedElement.type === 'title'"
        [title]="selectedElement.title!"
        (optionsSaved)="saveOptions($event)"
      ></title-options-form>

      <text-options-form
        *ngIf="selectedElement.type === 'text'"
        [text]="selectedElement.text!"
        (optionsSaved)="saveOptions($event)"
      ></text-options-form>

      <accordion-options-form
        *ngIf="selectedElement.type === 'accordion'"
        [title]="selectedElement.title!"
        [styles]="selectedElement.styles!"
        (optionsSaved)="saveOptions($event)"
      ></accordion-options-form>

      <container-options-form
        *ngIf="['main', 'row', 'column'].includes(selectedElement.type)"
        [styles]="selectedElement.styles!"
        (optionsSaved)="saveOptions($event)"
      ></container-options-form>
    </div>
  `,
  styles: [],
})
export class LayoutOptionsComponent {
  @Input({ required: true }) selectedElement: TemplateElement;

  private builderFacade = inject(BuilderFacade);

  saveOptions(options: any): void {
    this.builderFacade.updateElement({
      ...this.selectedElement,
      ...options,
    });
  }
}
