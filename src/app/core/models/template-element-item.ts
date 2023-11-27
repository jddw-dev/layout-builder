export enum TemplateElementItemType {
  ONE_COL_HALF = 'one-col-half',
  TWO_COLS = 'two-cols',
  THREE_COLS = 'three-cols',
  ACCORDION = 'accordion',
  DIVIDER = 'divider',
  TITLE = 'title',
  TEXT = 'text',
  SHEET = 'sheet',
}

export interface TemplateElementItem {
  type: TemplateElementItemType;
  displayName?: string;
  image?: string;
  isContainer?: boolean;
}
