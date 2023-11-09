import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElement } from '../../core/models/template-element';
import { TemplateElementPreviewComponent } from '../../template-element-preview/template-element-preview.component';

@Component({
  selector: 'app-row-element',
  standalone: true,
  imports: [
    CommonModule,
    forwardRef(() => TemplateElementPreviewComponent),
    DragDropModule,
  ],
  templateUrl: './row-element.component.html',
  styleUrls: ['./row-element.component.scss'],
})
export class RowElementComponent {
  @Input() content?: TemplateElement[];
}
