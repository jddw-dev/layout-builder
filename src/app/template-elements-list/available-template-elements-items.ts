import {
  TemplateElementItem,
  TemplateElementItemType,
} from '../core/models/template-element-item';

export const availableTemplateElementsItems: TemplateElementItem[] = [
  {
    type: TemplateElementItemType.ROW,
    displayName: 'Row',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.COL,
    displayName: 'Col',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.ACCORDION,
    displayName: 'Accordion',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.TAB,
    displayName: 'Tab',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.DIVIDER,
    displayName: 'Divider',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.TITLE,
    displayName: 'Title',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.TEXT,
    displayName: 'Text',
    isContainer: false,
  },
];
