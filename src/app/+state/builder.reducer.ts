import { createReducer, on } from '@ngrx/store';
import { DropPosition } from '../core/models/drop-position';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementItem } from '../core/models/template-element-item';
import { BuilderActions } from './builder.actions';

// TODO : vers autre fichier ?!
export interface GhostInfos {
  parentId: string;
  insertPosition: DropPosition;
}

export interface BuilderState {
  currentLayout: TemplateElement | null;
  currentItem: TemplateElementItem | null;
  isDragging: boolean;
  currentGhostInfos: GhostInfos | null;
}

const initialState: BuilderState = {
  currentLayout: null,
  currentItem: null,
  isDragging: false,
  currentGhostInfos: null,
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
  on(BuilderActions.dragEnd, (state) => ({ ...initialState })),
  on(
    BuilderActions.displayGhostSuccess,
    (state, { updatedLayout, parentId, insertPosition }) => ({
      ...state,
      currentLayout: updatedLayout,
      currentGhostInfos: { parentId, insertPosition },
    })
  )
);
