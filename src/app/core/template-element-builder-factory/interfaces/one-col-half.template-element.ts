import { v4 as uuidv4 } from 'uuid';
import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class OneColHalfTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: TemplateElementType.ROW,
      content: [
        {
          id: uuidv4(),
          type: TemplateElementType.COLUMN,
          content: [],
          styles: [
            { property: 'width', value: '50%' },
            { property: 'margin', value: '0 auto' },
          ],
        },
      ],
    };
  }
}