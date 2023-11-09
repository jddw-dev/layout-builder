import { Injectable } from '@angular/core';
import { TemplateElementBuilder } from './interfaces/template-element-builder.interface';
import { TwoColsHalfTemplateElement } from './interfaces/two-cols-half-template-element';

@Injectable({ providedIn: 'root' })
export class TemplateElementBuilderFactory {
  createElementBuilder(type: string): TemplateElementBuilder | null {
    if (type === '2-cols-50') {
      return new TwoColsHalfTemplateElement();
    }

    return null;
  }
}
