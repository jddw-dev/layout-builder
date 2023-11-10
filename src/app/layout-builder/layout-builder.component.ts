import { Component, OnInit, inject } from '@angular/core';
import { BuilderFacade } from '../+state/builder.facade';
import { LayoutPreviewComponent } from '../layout-preview/layout-preview.component';
import { TemplateElementsListComponent } from './../template-elements-list/template-elements-list.component';
import { DEFAULT_LAYOUT } from './default-layout';

@Component({
  standalone: true,
  selector: 'layout-builder',
  template: `
    <div class="container-fluid">
      <div class="layout-builder row">
        <div class="layout-builder__sidebar col-4 col-md-2">
          <template-elements-list></template-elements-list>
        </div>

        <div class="layout-builder__main-content col-8 col-md-10">
          <layout-preview></layout-preview>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .layout-builder {
        height: 100vh;
      }

      .layout-builder__sidebar {
        background-color: #f5f5f5;
        border-right: 1px solid #e0e0e0;
        height: 100%;
        overflow-y: auto;
      }

      .layout-builder__main-content {
        height: 100%;
        overflow-y: auto;
      }
    `,
  ],
  imports: [TemplateElementsListComponent, LayoutPreviewComponent],
})
export class LayoutBuilderComponent implements OnInit {
  private builderFacade = inject(BuilderFacade);

  ngOnInit(): void {
    this.builderFacade.loadLayout(DEFAULT_LAYOUT);
  }
}
