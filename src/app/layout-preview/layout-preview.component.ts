import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BuilderFacade } from '../+state/builder.facade';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'layout-preview',
  standalone: true,
  imports: [NgIf, AsyncPipe, TemplateElementPreviewComponent],
  template: `
    <section class="layout-preview">
      <div *ngIf="layout$ | async as layout">
        <template-element-preview [element]="layout"></template-element-preview>
      </div>
    </section>
  `,
})
export class LayoutPreviewComponent {
  private builderFacade = inject(BuilderFacade);
  layout$ = this.builderFacade.currentLayout$;
}
