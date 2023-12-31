import { createReducer, on } from '@ngrx/store';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementItem } from '../core/models/template-element-item';
import { BuilderActions } from './builder.actions';

// TODO : vers autre fichier ?!
export interface GhostInfos {
  parentId: string;
  insertAfterId: string | null;
}

export interface BuilderState {
  currentLayout: TemplateElement | null;
  currentItem: TemplateElementItem | null;
  isDragging: boolean;
  currentGhostInfos: GhostInfos | null;
  selectedElement: TemplateElement | null;
}

const initialState: BuilderState = {
  currentLayout: null,
  currentItem: null,
  isDragging: false,
  currentGhostInfos: null,
  selectedElement: null,
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
  on(BuilderActions.dragEnd, (state) => ({ ...state, isDragging: false })),
  on(
    BuilderActions.displayGhostSuccess,
    (state, { updatedLayout, parentId, insertAfterId }) => ({
      ...state,
      currentLayout: updatedLayout,
      currentGhostInfos: {
        parentId,
        insertAfterId,
      },
    })
  ),
  on(BuilderActions.selectElement, (state, { element }) => ({
    ...state,
    selectedElement: element,
  })),
  on(BuilderActions.removeSelectedElement, (state) => ({
    ...state,
    selectedElement: null,
  })),
  on(
    BuilderActions.updateElementSuccess,
    (state, { updatedLayout, element }) => ({
      ...state,
      currentLayout: updatedLayout,
      selectedElement: element,
    })
  )
);
