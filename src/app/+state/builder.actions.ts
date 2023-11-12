import { createActionGroup, emptyProps, props } from '@ngrx/store';
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
      insertAfterId: string | null;
    }>(),
    'Display Ghost Success': props<{
      updatedLayout: TemplateElement;
      parentId: string;
      insertAfterId: string | null;
    }>(),
    Drop: props<{ parentId: string; insertAfterId: string | null }>(),
    'Drop Success': props<{ updatedLayout: TemplateElement }>(),
    'Select Element': props<{ element: TemplateElement }>(),
    'Remove Selected Element': emptyProps(),
    'Update Element': props<{ element: TemplateElement }>(),
    'Update Element Success': props<{
      updatedLayout: TemplateElement;
      element: TemplateElement;
    }>(),
  },
});
