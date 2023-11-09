import { createReducer, on } from '@ngrx/store';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementItem } from '../template-elements-list/template-elements-list.component';
import { BuilderActions } from './builder.actions';

export interface BuilderState {
  currentLayout: TemplateElement | null;
  currentItem: TemplateElementItem | null;
  isDragging: boolean;
}

const initialState: BuilderState = {
  currentLayout: null,
  currentItem: null,
  isDragging: false,
};

export const builderReducer = createReducer(
  initialState,
  on(BuilderActions.loadLayoutSuccess, (state, { layout }) => ({
    ...state,
    currentLayout: layout,
  })),
  on(BuilderActions.dragStart, (state, { element }) => ({
    ...state,
    currentItem: element,
    isDragging: true,
  })),
  on(BuilderActions.dropSuccess, (state, { updatedLayout }) => ({
    ...state,
    currentLayout: updatedLayout,
    isDragging: false,
  })),
  on(BuilderActions.dragEnd, (state) => ({ ...initialState }))
);
