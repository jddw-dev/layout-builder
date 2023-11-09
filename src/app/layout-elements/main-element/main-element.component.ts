import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import { TemplateElement } from '../../core/models/template-element';
import { TemplateElementPreviewComponent } from '../../template-element-preview/template-element-preview.component';

@Component({
  selector: 'app-main-element',
  standalone: true,
  imports: [CommonModule, forwardRef(() => TemplateElementPreviewComponent)],
  templateUrl: './main-element.component.html',
  styleUrls: ['./main-element.component.scss'],
})
export class MainElementComponent {
  @Input() content?: TemplateElement[];
}
