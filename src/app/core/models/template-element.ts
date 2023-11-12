export enum TemplateElementType {
  MAIN = 'main',
  ROW = 'row',
  COLUMN = 'column',
  SHEET = 'sheet',
  TITLE = 'title',
  TEXT = 'text',
  TAB = 'tab',
  DIVIDER = 'divider',
}

export interface TemplateElement {
  // Utils properties
  id?: string;
  isGhost?: boolean;
  acceptDrop?: boolean;

  // Export properties
  type: TemplateElementType;
  content?: TemplateElement[];
  displayName?: boolean;
  styles?: { property: string; value: string }[];
  title?: string;
  text?: string;
}
