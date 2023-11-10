import { Injectable } from '@angular/core';
import { TemplateElementItemType } from './../models/template-element-item';
import { ColTemplateElement } from './interfaces/col-template-element';
import { RowTemplateElement } from './interfaces/row-template-element';
import { TemplateElementBuilder } from './interfaces/template-element-builder.interface';

@Injectable({ providedIn: 'root' })
export class TemplateElementBuilderFactory {
  createElementBuilder(
    type: TemplateElementItemType
  ): TemplateElementBuilder | null {
    switch (type) {
      case TemplateElementItemType.ROW:
        return new RowTemplateElement();

      case TemplateElementItemType.COL:
        return new ColTemplateElement();

      default:
        return null;
    }
  }
}
