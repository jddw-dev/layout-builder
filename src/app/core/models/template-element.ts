export enum TemplateElementType {
  MAIN = 'main',
  ROW = 'row',
  COLUMN = 'column',
  SHEET = 'sheet',
  HIDDEN = 'hidden',
}

export interface TemplateElement {
  // Utils properties
  id?: string;
  isGhost?: boolean;

  // Export properties
  type: TemplateElementType;
  content?: TemplateElement[];
  displayName?: boolean;
  styles?: { property: string; value: string }[];
}
