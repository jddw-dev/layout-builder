import { v4 as uuidv4 } from 'uuid';

import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class DividerTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: TemplateElementType.DIVIDER,
    };
  }
}
