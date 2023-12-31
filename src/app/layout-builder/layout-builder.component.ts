import { AsyncPipe, JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { BuilderFacade } from '../+state/builder.facade';
import { LayoutOptionsComponent } from '../layout-options/layout-options.component';
import { LayoutPreviewComponent } from '../layout-preview/layout-preview.component';
import { TemplateElementsListComponent } from './../template-elements-list/template-elements-list.component';
import { DEFAULT_LAYOUT } from './default-layout';

@Component({
  standalone: true,
  selector: 'layout-builder',
  imports: [
    TemplateElementsListComponent,
    LayoutPreviewComponent,
    LayoutOptionsComponent,
    AsyncPipe,
    JsonPipe,
    NgIf,
    NgClass,
    LetDirective,
  ],
  template: `
    <div class="container-fluid" (click)="removeSelectedElement()">
      <div class="layout-builder row">
        <div class="layout-builder__sidebar col-4 col-md-2">
          <template-elements-list></template-elements-list>
        </div>

        <div
          *ngrxLet="selectedElement$ as selectedElement"
          class="layout-builder__main-content"
          [ngClass]="selectedElement ? 'col-6 col-md-8' : 'col-8 col-md-10'"
        >
          <layout-preview></layout-preview>

          <div style="margin-top: 20px;">
            <h2>Generated JSON</h2>
            <pre>{{ builderFacade.currentLayoutToExport$ | async | json }}</pre>
          </div>
        </div>

        <div
          (click)="onOptionsClick($event)"
          *ngIf="selectedElement$ | async as selectedElement"
          class="layout-builder__options col-2 col-md-2"
        >
          <layout-options [selectedElement]="selectedElement"></layout-options>
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
        flex-basis: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutBuilderComponent implements OnInit {
  builderFacade = inject(BuilderFacade);

  selectedElement$ = this.builderFacade.selectedElement$;

  ngOnInit(): void {
    this.builderFacade.loadLayout(DEFAULT_LAYOUT);
  }

  // Prevent from closing options panel when clicking on it
  onOptionsClick(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }

  removeSelectedElement(): void {
    this.builderFacade.removeSelectedElement();
  }
}
