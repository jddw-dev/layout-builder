import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BuilderFacade } from '../+state/builder.facade';
import { TemplateElement } from '../core/models/template-element';
import { LayoutPreviewComponent } from '../layout-preview/layout-preview.component';
import { TemplateElementsListComponent } from './../template-elements-list/template-elements-list.component';

@Component({
  standalone: true,
  selector: 'app-layout-builder',
  templateUrl: './layout-builder.component.html',
  styleUrls: ['./layout-builder.component.scss'],
  imports: [
    MatSidenavModule,
    TemplateElementsListComponent,
    LayoutPreviewComponent,
    CdkDropListGroup,
  ],
})
export class LayoutBuilderComponent implements OnInit {
  private readonly defaultLayout: TemplateElement = {
    type: 'main',
    content: [
      {
        type: 'row',
        content: [
          {
            type: 'column',
            content: [
              {
                type: 'row',
                content: [
                  { type: 'column', content: [] },
                  { type: 'column', content: [] },
                ],
              },
            ],
          },
          { type: 'column', content: [] },
        ],
      },
    ],
  };

  constructor(private builderFacade: BuilderFacade) {}

  ngOnInit(): void {
    this.builderFacade.loadLayout(this.defaultLayout);
  }
}
