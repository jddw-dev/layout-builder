import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BuilderFacade } from '../+state/builder.facade';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'app-layout-preview',
  standalone: true,
  imports: [CommonModule, TemplateElementPreviewComponent],
  templateUrl: './layout-preview.component.html',
  styleUrls: ['./layout-preview.component.scss'],
})
export class LayoutPreviewComponent {
  layout$ = this.builderFacade.currentLayout$;

  constructor(private builderFacade: BuilderFacade) {}
}
