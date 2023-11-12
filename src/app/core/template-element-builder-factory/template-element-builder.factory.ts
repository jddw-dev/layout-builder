import { Injectable } from '@angular/core';
import { TemplateElementItemType } from './../models/template-element-item';
import { TemplateElementBuilder } from './interfaces/core/template-element-builder.interface';
import { OneColHalfTemplateElement } from './interfaces/one-col-half.template-element';
import { TextTemplateElement } from './interfaces/text.template-element';
import { ThreeColsTemplateElement } from './interfaces/three-cols.template-element';
import { TitleTemplateElement } from './interfaces/title.template-element';
import { TwoColsTemplateElement } from './interfaces/two-cols.template-element';

@Injectable({ providedIn: 'root' })
export class TemplateElementBuilderFactory {
  createElementBuilder(
    type: TemplateElementItemType
  ): TemplateElementBuilder | null {
    switch (type) {
      case TemplateElementItemType.ONE_COL_HALF:
        return new OneColHalfTemplateElement();

      case TemplateElementItemType.TWO_COLS:
        return new TwoColsTemplateElement();

      case TemplateElementItemType.THREE_COLS:
        return new ThreeColsTemplateElement();

      case TemplateElementItemType.TITLE:
        return new TitleTemplateElement();

      case TemplateElementItemType.TEXT:
        return new TextTemplateElement();

      default:
        return null;
    }
  }
}
