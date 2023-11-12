import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { LayoutBuilderService } from '../core/services/layout-builder.service';
import { BuilderActions } from './builder.actions';
import { BuilderFacade } from './builder.facade';

@Injectable({ providedIn: 'root' })
export class BuilderEffects {
  private actions$ = inject(Actions);
  private builderFacade = inject(BuilderFacade);
  private layoutBuilderService = inject(LayoutBuilderService);

  /**
   * This effect is used to generate ID for each layout element
   * Id is then used to know where the drop happened
   */
  loadLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.loadLayout),
      switchMap(({ layout }) => {
        const updatedLayout = this.layoutBuilderService.generateId(layout);

        return of(BuilderActions.loadLayoutSuccess({ layout: updatedLayout }));
      })
    )
  );

  drop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.drop),
      pipe(
        withLatestFrom(this.builderFacade.currentLayoutAndItem$),
        switchMap(
          ([{ parentId, insertAfterId }, { currentLayout, currentItem }]) => {
            const updatedLayout = this.layoutBuilderService.buildUpdatedLayout(
              currentLayout!,
              currentItem,
              parentId,
              insertAfterId,
              false
            );

            if (!updatedLayout) {
              return EMPTY;
            }

            return of(BuilderActions.dropSuccess({ updatedLayout }));
          }
        )
      )
    )
  );

  displayGhost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.displayGhost),
      pipe(
        withLatestFrom(this.builderFacade.currentLayoutItemGhost$),
        switchMap(
          ([
            { parentId, insertAfterId },
            { currentLayout, currentItem, currentGhostInfos },
          ]) => {
            console.log('EFFECT displayGhost$');
            console.log(`${parentId} - ${insertAfterId}`);

            if (
              currentGhostInfos?.parentId === parentId &&
              currentGhostInfos?.insertAfterId === insertAfterId
            ) {
              // Ghost already exists !
              console.log('already exists');
              return EMPTY;
            }

            const updatedLayout = this.layoutBuilderService.buildUpdatedLayout(
              currentLayout!,
              currentItem,
              parentId,
              insertAfterId,
              true
            );

            // If ever ghost is all layout, should not happen in real world
            if (!updatedLayout) {
              return EMPTY;
            }

            return of(
              BuilderActions.displayGhostSuccess({
                updatedLayout,
                parentId,
                insertAfterId,
              })
            );
          }
        )
      )
    )
  );
}
