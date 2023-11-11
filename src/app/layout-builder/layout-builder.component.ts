import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { BuilderFacade } from '../+state/builder.facade';
import { LayoutPreviewComponent } from '../layout-preview/layout-preview.component';
import { TemplateElementsListComponent } from './../template-elements-list/template-elements-list.component';
import { DEFAULT_LAYOUT } from './default-layout';

@Component({
  standalone: true,
  selector: 'layout-builder',
  imports: [
    TemplateElementsListComponent,
    LayoutPreviewComponent,
    AsyncPipe,
    JsonPipe,
  ],
  template: `
    <div class="container-fluid">
      <div class="layout-builder row">
        <div class="layout-builder__sidebar col-4 col-md-2">
          <template-elements-list></template-elements-list>
        </div>

        <div class="layout-builder__main-content col-6 col-md-9">
          <layout-preview></layout-preview>

          <div style="margin-top: 20px;">
            <h2>Generated JSON</h2>
            <pre>{{ builderFacade.currentLayoutToExport$ | async | json }}</pre>
          </div>
        </div>

        <div class="layout-builder__options col-2 col-md-1">
          <h2 class="text-center">Options</h2>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      // Prevent native Drag&Drop on images
      img {
        -webkit-user-drag: none;
      }

      .layout-builder {
        height: 100vh;
      }

      .layout-builder__sidebar {
        background-color: #f5f5f5;
        border-right: 1px solid #e0e0e0;
        padding: 20px 10px;
      }

      .layout-builder__options {
        background-color: #f5f5f5;
        border-left: 1px solid #e0e0e0;
        padding: 20px 10px;
      }

      .layout-builder__main-content {
        padding-top: 20px;
      }

      .element-wrapper.drag-over > * > .element-preview {
        border: 2px solid red;
      }

      .element-wrapper,
      .main-element,
      .row-element,
      .col-element,
      .element-wrapper > *,
      .main-element > *,
      .row-element > *,
      .col-element > * {
        // display: flex;
        flex-basis: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutBuilderComponent implements OnInit {
  builderFacade = inject(BuilderFacade);

  ngOnInit(): void {
    this.builderFacade.loadLayout(DEFAULT_LAYOUT);
  }
}
