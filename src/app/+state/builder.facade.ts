import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TemplateElement } from '../core/models/template-element';
import { BuilderActions } from './builder.actions';
import {
  selectBuilderCurrentItem,
  selectBuilderCurrentLayout,
  selectBuilderCurrentLayoutAndItem,
} from './builder.selectors';

@Injectable({ providedIn: 'root' })
export class BuilderFacade {
  private readonly store = inject(Store);

  currentLayout$ = this.store.pipe(select(selectBuilderCurrentLayout));
  currentItem$ = this.store.pipe(select(selectBuilderCurrentItem));
  currentLayoutAndItem$ = this.store.pipe(
    select(selectBuilderCurrentLayoutAndItem)
  );

  loadLayout(layout: TemplateElement) {
    this.store.dispatch(BuilderActions.loadLayout({ layout }));
  }

  drop(parentId: string) {
    this.store.dispatch(BuilderActions.drop({ parentId }));
  }
}
