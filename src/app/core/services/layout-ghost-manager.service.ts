import { Injectable } from '@angular/core';
import { TemplateElement } from '../models/template-element';

/**
 * This service is used to manage layout's ghost
 * Responsible for generating / updating / removing ghost element
 */
@Injectable({ providedIn: 'root' })
export class LayoutGhostManagerService {
  /**
   * Transform element into ghost element
   * Also apply ghost to all children
   *
   * @param element Element to transform into ghost
   * @returns Updated element
   */
  getGhostElement(element: TemplateElement): TemplateElement {
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
  removeGhostElement(element: TemplateElement): TemplateElement | null {
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
