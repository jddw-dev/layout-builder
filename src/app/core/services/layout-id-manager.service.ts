import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { TemplateElement } from '../models/template-element';

/**
 * This service is used to generate IDs for layout elements
 * Responsible for generating IDs for each element and its children
 */
@Injectable({ providedIn: 'root' })
export class LayoutIdManagerService {
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
}
