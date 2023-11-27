import { v4 as uuidv4 } from 'uuid';
import {
  TemplateElement,
  TemplateElementType,
} from '../models/template-element';
import { TemplateElementBuilder } from './interfaces/core/template-element-builder.interface';

export class SheetTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(),
      type: TemplateElementType.SHEET,
      content: [],
      acceptDrop: false,
    };
  }
}
