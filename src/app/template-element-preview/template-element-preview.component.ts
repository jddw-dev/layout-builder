import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { BuilderFacade } from '../+state/builder.facade';
import { TemplateElement } from '../core/models/template-element';
import { ColElementComponent } from '../layout-elements/col-element/col-element.component';
import { MainElementComponent } from '../layout-elements/main-element/main-element.component';
import { RowElementComponent } from '../layout-elements/row-element/row-element.component';

@Component({
  selector: 'app-template-element-preview',
  templateUrl: './template-element-preview.component.html',
  styleUrls: ['./template-element-preview.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MainElementComponent,
    RowElementComponent,
    ColElementComponent,
    DragDropModule,
  ],
})
export class TemplateElementPreviewComponent {
  @Input({ required: true }) element: TemplateElement;

  constructor(private builderFacade: BuilderFacade) {}

  drop(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.element.id) {
      this.builderFacade.drop(this.element.id);
    }
  }
}
