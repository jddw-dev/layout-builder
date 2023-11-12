import { inject, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { InsertPosition } from '../models/insert-position';
import { TemplateElement } from '../models/template-element';
import { TemplateElementItem } from '../models/template-element-item';
import { TemplateElementBuilderFactory } from '../template-element-builder-factory/template-element-builder.factory';

@Injectable({ providedIn: 'root' })
export class LayoutBuilderService {
  private templateElementBuilderFactory = inject(TemplateElementBuilderFactory);

  /**
   * This method is used to generate ID for each layout element
   * Id is then used to know where the drop happened
   * Also generate IDs for each element's children
   *
   * @param element Element to generate ID for
   * @returns Element with ID and children with IDs
   */
  generateId(element: TemplateElement): TemplateElement {
    const updatedElement: TemplateElement = { ...element };

    if (!updatedElement.id) {
      updatedElement.id = uuidv4();
    }

    updatedElement.content = this.generateIdsForChildren(updatedElement);

    return updatedElement;
  }

  private generateIdsForChildren(element: TemplateElement): TemplateElement[] {
    const updatedContent: TemplateElement[] = [];

    if (element.content) {
      for (const child of element.content) {
        updatedContent.push(this.generateId(child));
      }
    }

    return updatedContent;
  }

  buildUpdatedLayout(
    currentLayout: TemplateElement,
    currentItem: TemplateElementItem | null,
    insertPosition: InsertPosition,
    isGhost = false
  ): TemplateElement | null {
    const newElement = this.getNewElement(currentItem, isGhost);

    const updatedLayout = this.getUpdatedLayout(
      currentLayout!,
      newElement,
      insertPosition
    );

    if (!updatedLayout) {
      console.error('Updated layout could not be built');
      return null;
    }

    return updatedLayout;
  }

  private insertChild(
    content: TemplateElement,
    childToInsert: TemplateElement,
    insertPosition: InsertPosition
  ) {
    const updatedContent: TemplateElement = { ...content, content: [] };
    if (content.content) {
      updatedContent.content = [...content.content];
    }

    if (updatedContent.id === insertPosition.parentId) {
      // We found the right parent

      if (!updatedContent.content) {
        updatedContent.content = [];
      }

      if (insertPosition.insertAfterId === null) {
        // Insert top
        updatedContent.content = [childToInsert, ...updatedContent.content];
      } else {
        // Insert bottom
        const insertAfterIndex = updatedContent.content.findIndex(
          (child) => child.id === insertPosition.insertAfterId
        );

        if (insertAfterIndex === -1) {
          console.error('Insert after id not found');
          return updatedContent;
        }

        updatedContent.content.splice(insertAfterIndex + 1, 0, childToInsert);
      }
    } else {
      const updatedChildren: TemplateElement[] = [];

      if (updatedContent.content) {
        for (const child of updatedContent.content) {
          const updatedChild = this.insertChild(
            child,
            childToInsert,
            insertPosition
          );
          updatedChildren.push(updatedChild);
        }
      }

      updatedContent.content = updatedChildren;
    }

    return updatedContent;
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
    insertPosition: InsertPosition
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
        newElement,
        insertPosition
      );
    }

    return updatedLayout;
  }

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
