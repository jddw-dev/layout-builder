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
      ? getTemplateElementWithoutId(state.currentLayout)
      : null
);

const getTemplateElementWithoutId = (templateElement: TemplateElement) => {
  const updatedElement = {
    ...templateElement,
    id: undefined,
  };

  if (templateElement.content) {
    // Reset content
    updatedElement.content = [];

    templateElement.content.forEach((element) => {
      const updatedChildElement = getTemplateElementWithoutId(element);
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
