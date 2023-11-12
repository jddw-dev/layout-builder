import { v4 as uuidv4 } from 'uuid';
import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class ThreeColsTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: TemplateElementType.ROW,
      content: [
        {
          id: uuidv4(),
          type: TemplateElementType.COLUMN,
          content: [],
        },

        {
          id: uuidv4(),
          type: TemplateElementType.COLUMN,
          content: [],
        },

        {
          id: uuidv4(),
          type: TemplateElementType.COLUMN,
          content: [],
        },
      ],
    };
  }
}
