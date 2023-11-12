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
    <h3 class="text-center">{{ selectedElement.type }}</h3>

    <div [ngSwitch]="selectedElement.type">
      <title-options-form
        *ngSwitchCase="'title'"
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
    // TODO : extends to all options
    /**
     * Créer des composants form pour chaque type d'élément (avec les bonnes options)
     * et les afficher en fonction du type d'élément sélectionné
     *
     * Les composants ont un output qui renvoie l'ensemble des options sous forme de clés / values
     * Il n'y a plus alors qu'à build l'élémement mis à jour
     */
    this.builderFacade.updateElement({
      ...this.selectedElement,
      ...options,
    });
  }
}
