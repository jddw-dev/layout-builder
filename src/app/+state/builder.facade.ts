import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementItem } from '../core/models/template-element-item';
import { BuilderActions } from './builder.actions';
import {
  selectBuilderCurrentItem,
  selectBuilderCurrentLayout,
  selectBuilderCurrentLayoutAndItem,
  selectBuilderLayoutItemGhost,
  selectBuilderLayoutToExport,
} from './builder.selectors';

@Injectable({ providedIn: 'root' })
export class BuilderFacade {
  private readonly store = inject(Store);

  currentLayout$ = this.store.pipe(select(selectBuilderCurrentLayout));
  currentLayoutToExport$ = this.store.pipe(select(selectBuilderLayoutToExport));
  currentItem$ = this.store.pipe(select(selectBuilderCurrentItem));
  currentLayoutAndItem$ = this.store.pipe(
    select(selectBuilderCurrentLayoutAndItem)
  );
  currentLayoutItemGhost$ = this.store.pipe(
    select(selectBuilderLayoutItemGhost)
  );

  loadLayout(layout: TemplateElement) {
    this.store.dispatch(BuilderActions.loadLayout({ layout }));
  }

  dragStart(element: TemplateElementItem) {
    this.store.dispatch(BuilderActions.dragStart({ element }));
  }

  dragEnd(element: TemplateElementItem) {
    this.store.dispatch(BuilderActions.dragEnd({ element }));
  }

  drop(parentId: string, insertAfterId: string | null) {
    this.store.dispatch(BuilderActions.drop({ parentId, insertAfterId }));
  }

  displayGhost(parentId: string, insertAfterId: string | null) {
    this.store.dispatch(
      BuilderActions.displayGhost({ parentId, insertAfterId })
    );
  }

  selectElement(element: TemplateElement) {
    this.store.dispatch(BuilderActions.selectElement({ element }));
  }

  removeSelectedElement() {
    this.store.dispatch(BuilderActions.removeSelectedElement());
  }
}
