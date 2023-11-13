import { v4 as uuidv4 } from 'uuid';

import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class AccordionTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      acceptDrop: true,
      type: TemplateElementType.ACCORDION,
      title: 'Accordéon',
      content: [],
    };
  }
}
