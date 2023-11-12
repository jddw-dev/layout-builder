import {
  TemplateElementItem,
  TemplateElementItemType,
} from '../core/models/template-element-item';

export const availableTemplateElementsItems: TemplateElementItem[] = [
  {
    type: TemplateElementItemType.ONE_COL_HALF,
    displayName: 'one col half',
    image: 'assets/images/one-col-half.png',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.TWO_COLS,
    displayName: 'two cols',
    image: 'assets/images/two-cols.png',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.THREE_COLS,
    displayName: 'three cols',
    image: 'assets/images/three-cols.png',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.ACCORDION,
    displayName: 'accordion',
    // image: 'assets/images/accordion.png',
    isContainer: true,
  },

  {
    type: TemplateElementItemType.TAB,
    displayName: 'tab',
    // image: 'assets/images/tab.png',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.DIVIDER,
    displayName: 'divider',
    // image: 'assets/images/divider.png',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.TITLE,
    displayName: 'title',
    // image: 'assets/images/title.png',
    isContainer: false,
  },

  {
    type: TemplateElementItemType.TEXT,
    displayName: 'text',
    // image: 'assets/images/text.png',
    isContainer: false,
  },
];
