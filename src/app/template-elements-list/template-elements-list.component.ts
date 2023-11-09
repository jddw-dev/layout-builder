import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { Store } from '@ngrx/store';
import { DragDropModule } from 'primeng/dragdrop';
import { BuilderActions } from '../+state/builder.actions';
import { BuilderState } from '../+state/builder.reducer';

export interface TemplateElementItem {
  type: string;
  displayName: string;
}

@Component({
  selector: 'app-template-elements-list',
  standalone: true,
  imports: [CommonModule, MatDividerModule, DragDropModule],
  templateUrl: './template-elements-list.component.html',
  styleUrls: ['./template-elements-list.component.scss'],
})
export class TemplateElementsListComponent {
  constructor(private store: Store<BuilderState>) {}

  containersItems: TemplateElementItem[] = [
    {
      type: '1-col-50',
      displayName: '1 col, 50 %',
    },

    {
      type: '1-col-100',
      displayName: '1 col, 100 %',
    },

    {
      type: '2-cols-50',
      displayName: '2 cols, 50/50 %',
    },

    {
      type: 'accordion',
      displayName: 'accordion',
    },
  ];

  contentItems: TemplateElementItem[] = [
    {
      type: 'tab',
      displayName: 'Tab',
    },

    {
      type: 'divided',
      displayName: 'Divider',
    },

    {
      type: 'title',
      displayName: 'Title',
    },

    {
      type: 'text',
      displayName: 'Text',
    },
  ];

  onDragStart(element: TemplateElementItem) {
    this.store.dispatch(BuilderActions.dragStart({ element }));
  }

  onDragEnd(element: TemplateElementItem) {}
}
