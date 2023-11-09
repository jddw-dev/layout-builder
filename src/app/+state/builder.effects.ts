import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { TemplateElement } from '../core/models/template-element';
import { BuilderActions } from './builder.actions';
import { BuilderFacade } from './builder.facade';

@Injectable({ providedIn: 'root' })
export class BuilderEffects {
  private actions$ = inject(Actions);

  constructor(private builderFacade: BuilderFacade) {}

  /**
   * This effect is used to generate ID for each layout element
   * Id is then used to know where the drop happened
   */
  loadLayout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.loadLayout),
      switchMap(({ layout }) => {
        const updatedLayout = this.generateId(layout);

        return of(BuilderActions.loadLayoutSuccess({ layout: updatedLayout }));
      })
    )
  );

  private generateId(element: TemplateElement) {
    const updatedElement: TemplateElement = { ...element };

    if (!updatedElement.id) {
      updatedElement.id = uuidv4();
    }

    const updatedContent: TemplateElement[] = [];

    if (updatedElement.content) {
      for (const child of updatedElement.content) {
        const updatedChild = this.generateId(child);
        updatedContent.push(updatedChild);
      }
    }

    updatedElement.content = updatedContent;

    return updatedElement;
  }

  drop$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.drop),
      pipe(
        withLatestFrom(this.builderFacade.currentLayoutAndItem$),
        switchMap(([{ parentId }, { currentLayout, currentItem }]) => {
          // TODO : faire une factory ou dans le style ?
          // Ici juste pour tester
          let newElement: TemplateElement | null = null;

          if (currentItem?.type === '2-cols-50') {
            newElement = {
              id: uuidv4(),
              type: 'row',
              content: [
                {
                  id: uuidv4(),
                  type: 'column',
                  content: [],
                },
                {
                  id: uuidv4(),
                  type: 'column',
                  content: [],
                },
              ],
            };
          }

          let updatedLayout: TemplateElement = {
            ...currentLayout!,
          };

          if (newElement) {
            updatedLayout = this.insertChild(
              updatedLayout,
              parentId,
              newElement
            );
          }

          return of(BuilderActions.dropSuccess({ updatedLayout }));
        })
      )
    )
  );

  private insertChild(
    content: TemplateElement,
    parentId: string,
    childToInsert: TemplateElement
  ) {
    const updatedContent: TemplateElement = { ...content, content: [] };
    if (content.content) {
      updatedContent.content = [...content.content];
    }

    if (updatedContent.id === parentId) {
      if (!updatedContent.content) {
        updatedContent.content = [];
      }

      updatedContent.content.push(childToInsert);
    } else {
      const updatedChildren: TemplateElement[] = [];

      if (updatedContent.content) {
        for (const child of updatedContent.content) {
          const updatedChild = this.insertChild(child, parentId, childToInsert);
          updatedChildren.push(updatedChild);
        }
      }

      updatedContent.content = updatedChildren;
    }

    return updatedContent;
  }
}
