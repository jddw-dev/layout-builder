import { v4 as uuidv4 } from 'uuid';
import {
  TemplateElement,
  TemplateElementType,
} from '../../models/template-element';
import { TemplateElementBuilder } from './core/template-element-builder.interface';

export class TitleTemplateElement implements TemplateElementBuilder {
  getElement(): TemplateElement {
    return {
      id: uuidv4(), // TODO : move into ID service manager
      type: TemplateElementType.TITLE,
      title: 'Title', // TODO : need dynamic title
    };
  }
}
