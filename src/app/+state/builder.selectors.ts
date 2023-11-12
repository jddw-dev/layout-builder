import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TemplateElement } from '../core/models/template-element';
import { BuilderState } from './builder.reducer';

export const selectBuilderState =
  createFeatureSelector<BuilderState>('builder');

export const selectBuilderCurrentLayout = createSelector(
  selectBuilderState,
  (state: BuilderState) => state.currentLayout
);

export const selectBuilderLayoutToExport = createSelector(
  selectBuilderState,
  (state: BuilderState) =>
    state.currentLayout
      ? getTemplateElementWithoutUtilProperties(state.currentLayout)
      : null
);

// TODO : LayoutIdManager should be responsible
// So export has to be done in the facade / or in effects
const getTemplateElementWithoutUtilProperties = (
  templateElement: TemplateElement
) => {
  const updatedElement = {
    ...templateElement,
    id: undefined,
    acceptDrop: undefined,
  };

  if (templateElement.content) {
    // Reset content
    updatedElement.content = [];

    templateElement.content.forEach((element) => {
      const updatedChildElement =
        getTemplateElementWithoutUtilProperties(element);
      updatedElement.content!.push(updatedChildElement);
    });
  }

  return updatedElement;
};

export const selectBuilderCurrentItem = createSelector(
  selectBuilderState,
  (state: BuilderState) => state.currentItem
);

export const selectBuilderCurrentLayoutAndItem = createSelector(
  selectBuilderState,
  (state: BuilderState) => ({
    currentLayout: state.currentLayout,
    currentItem: state.currentItem,
  })
);

export const selectBuilderLayoutItemGhost = createSelector(
  selectBuilderState,
  (state: BuilderState) => ({
    currentLayout: state.currentLayout,
    currentItem: state.currentItem,
    currentGhostInfos: state.currentGhostInfos,
  })
);

export const selectBuilderSelectedElement = createSelector(
  selectBuilderState,
  (state: BuilderState) => state.selectedElement
);
