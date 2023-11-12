import {
  TemplateElement,
  TemplateElementType,
} from '../core/models/template-element';

export const DEFAULT_LAYOUT: TemplateElement = {
  type: TemplateElementType.MAIN,
  acceptDrop: true,
  content: [
    {
      type: TemplateElementType.ROW,
      content: [
        {
          type: TemplateElementType.COLUMN,
          acceptDrop: true,
          content: [
            {
              type: TemplateElementType.ROW,
              content: [
                {
                  type: TemplateElementType.COLUMN,
                  acceptDrop: true,
                  content: [],
                },
                {
                  type: TemplateElementType.COLUMN,
                  acceptDrop: true,
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: TemplateElementType.COLUMN,
          acceptDrop: true,
          content: [],
        },
      ],
    },

    {
      type: TemplateElementType.ROW,
      content: [
        {
          type: TemplateElementType.COLUMN,
          acceptDrop: true,
          content: [],
        },
        {
          type: TemplateElementType.COLUMN,
          acceptDrop: true,
          content: [
            {
              type: TemplateElementType.ROW,
              content: [
                {
                  type: TemplateElementType.COLUMN,
                  acceptDrop: true,
                  content: [],
                },
                {
                  type: TemplateElementType.COLUMN,
                  acceptDrop: true,
                  content: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
