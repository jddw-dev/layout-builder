import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, pipe, switchMap, withLatestFrom } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { DropPosition } from '../core/models/drop-position';
import { TemplateElement } from '../core/models/template-element';
import { TemplateElementBuilderFactory } from '../core/template-element-builder-factory/template-element-builder.factory';
import { TemplateElementItem } from './../core/models/template-element-item';
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
            const updatedLayout = this.buildUpdatedLayout(
              currentLayout!,
              currentItem,
              parentId,
              insertPosition,
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

  private buildUpdatedLayout(
    currentLayout: TemplateElement,
    currentItem: TemplateElementItem | null,
    parentId: string,
    insertPosition: DropPosition,
    isGhost = false
  ): TemplateElement | null {
    const newElement = this.getNewElement(currentItem, isGhost);

    const updatedLayout = this.getUpdatedLayout(
      currentLayout!,
      newElement,
      parentId,
      insertPosition
    );

    if (!updatedLayout) {
      console.error('Updated layout could not be built');
      return null;
    }

    return updatedLayout;
  }

  private getNewElement(
    currentItem: TemplateElementItem | null,
    isGhost = false
  ): TemplateElement | null {
    let newElement: TemplateElement | null = null;

    if (currentItem) {
      const builder = this.templateElementBuilderFactory.createElementBuilder(
        currentItem.type
      );

      if (builder) {
        newElement = builder.getElement();
        if (isGhost) {
          newElement = this.getGhostElement(newElement);
        }
      }
    }
    return newElement;
  }

  private getUpdatedLayout(
    currentLayout: TemplateElement,
    newElement: TemplateElement | null,
    parentId: string,
    insertPosition: DropPosition
  ): TemplateElement | null {
    let updatedLayout: TemplateElement | null = {
      ...currentLayout!,
    };

    updatedLayout = this.removeGhostElement(updatedLayout);
    if (!updatedLayout) {
      return null;
    }

    if (newElement) {
      updatedLayout = this.insertChild(
        updatedLayout,
        parentId,
        newElement,
        insertPosition
      );
    }

    return updatedLayout;
  }

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
              return EMPTY;
            }

            const updatedLayout = this.buildUpdatedLayout(
              currentLayout!,
              currentItem,
              parentId,
              insertPosition,
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
