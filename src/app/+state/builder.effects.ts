import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { DropPosition } from '../core/models/drop-position';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementBuilderFactory } from '../core/template-element-builder-factory/template-element-builder.factory';
import { BuilderActions } from './builder.actions';
import { BuilderFacade } from './builder.facade';

@Injectable({ providedIn: 'root' })
export class BuilderEffects {
  private actions$ = inject(Actions);

  constructor(
    private builderFacade: BuilderFacade,
    private templateElementBuilderFactory: TemplateElementBuilderFactory
  ) {}

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
        switchMap(
          ([{ parentId, insertPosition }, { currentLayout, currentItem }]) => {
            let newElement: TemplateElement | null = null;

            if (currentItem) {
              const builder =
                this.templateElementBuilderFactory.createElementBuilder(
                  currentItem.type
                );

              if (builder) {
                newElement = builder.getElement();
              }
            }

            let updatedLayout: TemplateElement = {
              ...currentLayout!,
            };

            if (newElement) {
              updatedLayout = this.insertChild(
                updatedLayout,
                parentId,
                newElement,
                insertPosition
              );

              console.log('updatedLayout:');
              console.log(updatedLayout);

              // Remove ghost on drop
              updatedLayout = this.removeGhostElement(updatedLayout)!;
            }

            return of(BuilderActions.dropSuccess({ updatedLayout }));
          }
        )
      )
    )
  );

  private insertChild(
    content: TemplateElement,
    parentId: string,
    childToInsert: TemplateElement,
    insertPosition: DropPosition = DropPosition.BOTTOM
  ) {
    const updatedContent: TemplateElement = { ...content, content: [] };
    if (content.content) {
      updatedContent.content = [...content.content];
    }

    if (updatedContent.id === parentId) {
      // We found the right parent

      if (!updatedContent.content) {
        updatedContent.content = [];
      }

      if (insertPosition === DropPosition.TOP) {
        updatedContent.content = [childToInsert, ...updatedContent.content];
      } else {
        updatedContent.content = [...updatedContent.content, childToInsert];
      }
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

  // TODO : DRY !!
  displayGhost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BuilderActions.displayGhost),
      pipe(
        withLatestFrom(this.builderFacade.currentLayoutItemGhost$),
        switchMap(
          ([
            { parentId, insertPosition },
            { currentLayout, currentItem, currentGhostInfos },
          ]) => {
            if (
              currentGhostInfos?.parentId === parentId &&
              currentGhostInfos?.insertPosition === insertPosition
            ) {
              // Ghost already exists !
              console.log('ghost already exists');
              return EMPTY;
            }

            let newElement: TemplateElement | null = null;

            if (currentItem) {
              const builder =
                this.templateElementBuilderFactory.createElementBuilder(
                  currentItem.type
                );

              if (builder) {
                newElement = builder.getElement();
                newElement = this.getGhostElement(newElement);
              }
            }

            let updatedLayout: TemplateElement | null = {
              ...currentLayout!,
            };

            // TODO : rendre plus propre
            updatedLayout = this.removeGhostElement(updatedLayout);
            if (!updatedLayout) {
              return EMPTY;
            }

            if (newElement) {
              updatedLayout = this.insertChild(
                updatedLayout,
                parentId,
                newElement,
                insertPosition
              );
            }

            return of(
              BuilderActions.displayGhostSuccess({
                updatedLayout,
                parentId,
                insertPosition,
              })
            );
          }
        )
      )
    )
  );

  private getGhostElement(element: TemplateElement): TemplateElement {
    const updatedElement = {
      ...element,
      isGhost: true,
    };

    if (element.content) {
      // Reset content
      updatedElement.content = [];

      element.content.forEach((childElement) => {
        const updatedChildElement = this.getGhostElement(childElement);
        updatedElement.content!.push(updatedChildElement);
      });
    }

    return updatedElement;
  }

  private removeGhostElement(element: TemplateElement): TemplateElement | null {
    if (element.isGhost) {
      return null;
    }

    const updatedElement = {
      ...element,
    };

    if (element.content) {
      // Reset content
      updatedElement.content = [];

      element.content.forEach((childElement) => {
        const updatedChildElement = this.removeGhostElement(childElement);
        if (updatedChildElement) {
          updatedElement.content!.push(updatedChildElement);
        }
      });
    }

    return updatedElement;
  }
}
