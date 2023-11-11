import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DropPosition } from '../core/models/drop-position';
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

  drop(parentId: string, insertPosition: DropPosition) {
    this.store.dispatch(BuilderActions.drop({ parentId, insertPosition }));
  }

  displayGhost(parentId: string, insertPosition: DropPosition) {
    this.store.dispatch(
      BuilderActions.displayGhost({ parentId, insertPosition })
    );
  }
}
