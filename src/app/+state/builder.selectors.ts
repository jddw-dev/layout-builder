import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BuilderState } from './builder.reducer';

export const selectBuilderState =
  createFeatureSelector<BuilderState>('builder');

export const selectBuilderCurrentLayout = createSelector(
  selectBuilderState,
  (state: BuilderState) => state.currentLayout
);

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
