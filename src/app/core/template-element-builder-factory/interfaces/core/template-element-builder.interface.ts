import { TemplateElement } from '../../../models/template-element';

export interface TemplateElementBuilder {
  getElement(): TemplateElement;
}
