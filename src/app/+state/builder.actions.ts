import { createActionGroup, props } from '@ngrx/store';
import { DropPosition } from '../core/models/drop-position';
import { TemplateElementItem } from '../core/models/template-element-item';
import { TemplateElement } from './../core/models/template-element';

export const BuilderActions = createActionGroup({
  source: 'Layout Builder',
  events: {
    'Load Layout': props<{ layout: TemplateElement }>(),
    'Load Layout Success': props<{ layout: TemplateElement }>(),
    'Drag Start': props<{ element: TemplateElementItem }>(),
    'Drag End': props<{ element: TemplateElementItem }>(),
    'Display Ghost': props<{
      parentId: string;
      insertPosition: DropPosition;
    }>(),
    'Display Ghost Success': props<{
      updatedLayout: TemplateElement;
      parentId: string;
      insertPosition: DropPosition;
    }>(),
    Drop: props<{ parentId: string; insertPosition: DropPosition }>(),
    'Drop Success': props<{ updatedLayout: TemplateElement }>(),
  },
});
