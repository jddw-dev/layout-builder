import { v4 as uuidv4 } from 'uuid';
import { TemplateElement } from '../../models/template-element';
import { TemplateElementBuilder } from './template-element-builder.interface';

export class TwoColsHalfTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: 'row',
      content: [
        {
          id: uuidv4(),
          type: 'column',
          content: [],
        },
        {
          id: uuidv4(),
          type: 'column',
          content: [],
        },
      ],
    };
  }
}
