export enum TemplateElementItemType {
  ONE_COL_HALF = 'one-col-half',
  TWO_COLS = 'two-cols',
  THREE_COLS = 'three-cols',
  ACCORDION = 'accordion',
  TAB = 'tab',
  DIVIDER = 'divider',
  TITLE = 'title',
  TEXT = 'text',
}

export interface TemplateElementItem {
  type: TemplateElementItemType;
  displayName?: string;
  image?: string;
  isContainer?: boolean;
}
