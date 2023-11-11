export enum TemplateElementType {
  MAIN = 'main',
  ROW = 'row',
  COLUMN = 'column',
  SHEET = 'sheet',
}

export interface TemplateElement {
  id?: string;
  type: TemplateElementType;
  content?: TemplateElement[];
  displayName?: boolean;
  styles?: { property: string; value: string }[];
}
