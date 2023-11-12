import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { LayoutBuilderService } from '../core/services/layout-builder.service';
import { LayoutIdManagerService } from '../core/services/layout-id-manager.service';
import { BuilderActions } from './builder.actions';
import { BuilderFacade } from './builder.facade';

@Injectable({ providedIn: 'root' })
export class BuilderEffects {
  private actions$ = inject(Actions);

  private layoutBuilderService = inject(LayoutBuilderService);
  private layoutIdManagerService = inject(LayoutIdManagerService);

  private builderFacade = inject(BuilderFacade);

  /**
   * This effect is used to generate ID for each layout element
   * Id is then used to know where the drop happened
   */
  loadLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.loadLayout),
      switchMap(({ layout }) => {
        const updatedLayout = this.layoutIdManagerService.generateId(layout);

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
            if (!currentLayout || !currentItem) {
              return EMPTY;
            }

            const updatedLayout = this.layoutBuilderService.buildUpdatedLayout(
              currentLayout,
              currentItem,
              { parentId, insertAfterId },
              false
            );

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
            if (!currentLayout || !currentItem) {
              return EMPTY;
            }

            if (
              currentGhostInfos?.parentId === parentId &&
              currentGhostInfos?.insertAfterId === insertAfterId
            ) {
              // Ghost already exists !
              return EMPTY;
            }

            const updatedLayout = this.layoutBuilderService.buildUpdatedLayout(
              currentLayout,
              currentItem,
              { parentId, insertAfterId },
              true
            );

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
