import { inject, Injectable } from '@angular/core';
import { InsertPosition } from '../models/insert-position';
import { TemplateElement } from '../models/template-element';
import { TemplateElementItem } from '../models/template-element-item';
import { TemplateElementBuilderFactory } from '../template-element-builder-factory/template-element-builder.factory';

/**
 * This service is used to manage layout updates
 * Responsible for inserting and removing elements into layout
 */
@Injectable({ providedIn: 'root' })
export class LayoutBuilderService {
  private templateElementBuilderFactory = inject(TemplateElementBuilderFactory);

  /**
   * Creates TemplateElement from TemplateElementItem
   * Then inserts it into layout
   *
   * @param currentLayout Current layout
   * @param currentItem Item to insert
   * @param insertPosition Where to insert the item
   * @param isGhost Is it the ghost item ?
   * @returns Updated layout
   */
  buildUpdatedLayout(
    currentLayout: TemplateElement,
    itemToInsert: TemplateElementItem,
    insertPosition: InsertPosition,
    isGhost = false
  ): TemplateElement {
    const elementToInsert = this.getNewElement(itemToInsert, isGhost);
    if (!elementToInsert) {
      // No changes needed
      return currentLayout;
    }

    const updatedLayout = this.getUpdatedLayout(
      currentLayout,
      elementToInsert,
      insertPosition
    );

    return updatedLayout;
  }

  /**
   * Creates TemplateElement from TemplateElementItem
   *
   * @param currentItem Current TemplateElementItem to create TemplateElement from
   * @param isGhost Is it the ghost element ?
   * @returns new TemplateElement or null if builder couldn't determine TemplateElement type
   */
  private getNewElement(
    currentItem: TemplateElementItem,
    isGhost = false
  ): TemplateElement | null {
    let newElement: TemplateElement | null = null;

    const builder = this.templateElementBuilderFactory.createElementBuilder(
      currentItem.type
    );

    if (builder) {
      newElement = builder.getElement();
      if (isGhost) {
        newElement = this.getGhostElement(newElement);
      }
    }

    return newElement;
  }

  /**
   * Insert child element into layout
   *
   * @param currentLayout Layout to insert into
   * @param elementToInsert Element to insert
   * @param insertPosition Where to insert the element
   * @returns Updated layout
   */
  private getUpdatedLayout(
    currentLayout: TemplateElement,
    elementToInsert: TemplateElement,
    insertPosition: InsertPosition
  ): TemplateElement {
    let updatedLayout: TemplateElement | null = {
      ...currentLayout,
    };

    updatedLayout = this.removeGhostElement(updatedLayout);
    if (!updatedLayout) {
      // Error : trying to insert an element inside the ghost
      return currentLayout;
    }

    return this.insertChild(updatedLayout, elementToInsert, insertPosition);
  }

  /**
   * Insert child element inside content
   * Returns updated content
   *
   * @param content Content to insert into
   * @param childToInsert Child to insert
   * @param insertPosition Where to insert the child
   * @returns Updated content element
   */
  private insertChild(
    content: TemplateElement,
    childToInsert: TemplateElement,
    insertPosition: InsertPosition
  ): TemplateElement {
    const updatedContent: TemplateElement = { ...content };

    if (updatedContent.id === insertPosition.parentId) {
      // We found the right parent
      if (!updatedContent.content) {
        updatedContent.content = [];
      }

      if (insertPosition.insertAfterId === null) {
        // Insert first
        updatedContent.content = [childToInsert, ...updatedContent.content];
      } else {
        // Find insert index
        const insertAfterIndex = updatedContent.content.findIndex(
          (child) => child.id === insertPosition.insertAfterId
        );

        // Index not found, don't update anything
        if (insertAfterIndex === -1) {
          console.error('Insert after id not found');
          return updatedContent;
        }

        // Insert in the right place
        updatedContent.content.splice(insertAfterIndex + 1, 0, childToInsert);
      }
    } else {
      // Insert in children
      const updatedChildren: TemplateElement[] = [];

      if (updatedContent.content) {
        for (const child of updatedContent.content) {
          updatedChildren.push(
            this.insertChild(child, childToInsert, insertPosition)
          );
        }
      }

      updatedContent.content = updatedChildren;
    }

    return updatedContent;
  }

  /**
   * Transform element into ghost element
   * Also apply ghost to all children
   *
   * @param element Element to transform into ghost
   * @returns Updated element
   */
  private getGhostElement(element: TemplateElement): TemplateElement {
    const updatedElement = {
      ...element,
      isGhost: true,
    };

    if (element.content) {
      // Reset content
      updatedElement.content = [];

      element.content.forEach((childElement) => {
        updatedElement.content!.push(this.getGhostElement(childElement));
      });
    }

    return updatedElement;
  }

  /**
   * Find ghost element inside element and its children
   * Then remove it and returns updated element
   *
   * @param element Element to remove ghost from
   * @returns Updated element or null if element is ghost
   */
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
