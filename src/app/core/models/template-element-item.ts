export enum TemplateElementItemType {
  ROW = 'row',
  COL = 'col',
  ACCORDION = 'accordion',
  TAB = 'tab',
  DIVIDER = 'divider',
  TITLE = 'title',
  TEXT = 'text',
}

export interface TemplateElementItem {
  type: TemplateElementItemType;
  displayName: string;
  isContainer?: boolean;
}
