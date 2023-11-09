import { createActionGroup, props } from '@ngrx/store';
import { TemplateElement } from './../core/models/template-element';
import { TemplateElementItem } from './../template-elements-list/template-elements-list.component';

export const BuilderActions = createActionGroup({
  source: 'Layout Builder',
  events: {
    'Load Layout': props<{ layout: TemplateElement }>(),
    'Load Layout Success': props<{ layout: TemplateElement }>(),
    'Drag Start': props<{ element: TemplateElementItem }>(),
    'Drag End': props<{ element: TemplateElementItem }>(),
    Drop: props<{ parentId: string }>(),
    'Drop Success': props<{ updatedLayout: TemplateElement }>(),
  },
});
