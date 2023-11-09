export interface TemplateElement {
  id?: string;
  type: 'main' | 'row' | 'column' | 'sheet';
  content?: TemplateElement[];
  displayName?: boolean;
  styles?: [{ property: string; value: string }];
}
