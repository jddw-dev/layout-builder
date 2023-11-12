import { v4 as uuidv4 } from 'uuid';
import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class TextTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: TemplateElementType.TEXT,
      text: 'Text sur plusieurs lignes...\n2e ligne pour voir', // TODO : need dynamic text
    };
  }
}
