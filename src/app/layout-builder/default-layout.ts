import {
  TemplateElement,
  TemplateElementType,
} from '../core/models/template-element';

export const DEFAULT_LAYOUT: TemplateElement = {
  type: TemplateElementType.MAIN,
  content: [
    {
      type: TemplateElementType.ROW,
      content: [
        {
          type: TemplateElementType.COLUMN,
          content: [
            {
              type: TemplateElementType.ROW,
              content: [
                { type: TemplateElementType.COLUMN, content: [] },
                { type: TemplateElementType.COLUMN, content: [] },
              ],
            },
          ],
        },
        { type: TemplateElementType.COLUMN, content: [] },
      ],
    },

    {
      type: TemplateElementType.ROW,
      content: [],
    },
  ],
};
