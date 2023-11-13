import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { DragDropModule } from 'primeng/dragdrop';
import { BuilderFacade } from '../+state/builder.facade';
import { TemplateElementItem } from '../core/models/template-element-item';
import { availableTemplateElementsItems } from './available-template-elements-items';
import { TemplateElementItemComponent } from './items/template-element-item.component';

@Component({
  selector: 'template-elements-list',
  standalone: true,
  imports: [
    NgFor,
    MatDividerModule,
    DragDropModule,
    TemplateElementItemComponent,
  ],
  template: `
    <section class="template-elements-list">
      <h1>Elements</h1>
      <mat-divider></mat-divider>
      <h2>Conteneurs</h2>
      <mat-divider></mat-divider>

      <div>
        <template-element-item
          *ngFor="let containerItem of containerItems"
          [element]="containerItem"
          (onDragStart)="onDragStart(containerItem)"
          (onDragEnd)="onDragEnd(containerItem)"
        ></template-element-item>
      </div>

      <mat-divider></mat-divider>
      <h2>Contenu</h2>
      <mat-divider></mat-divider>

      <div>
        <template-element-item
          *ngFor="let contentItem of contentItems"
          [element]="contentItem"
          (onDragStart)="onDragStart(contentItem)"
          (onDragEnd)="onDragEnd(contentItem)"
        ></template-element-item>
      </div>
    </section>
  `,
  styles: [
    `
      .template-elements-list {
        text-align: center;
      }
    `,
  ],
})
export class TemplateElementsListComponent {
  private builderFacade = inject(BuilderFacade);

  containerItems = availableTemplateElementsItems.filter(
    (item) => item.isContainer
  );

  contentItems = availableTemplateElementsItems.filter(
    (item) => !item.isContainer
  );

  onDragStart(element: TemplateElementItem) {
    this.builderFacade.dragStart(element);
  }

  onDragEnd(element: TemplateElementItem) {
    this.builderFacade.dragEnd(element);
  }
}
