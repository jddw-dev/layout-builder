import { NgClass, NgFor, NgStyle } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  forwardRef,
  inject,
} from '@angular/core';
import { Style } from '../core/models/style';
import { TemplateElement } from '../core/models/template-element';
import { StyleManagerService } from '../core/services/style-manager.service';
import { TemplateElementPreviewComponent } from '../template-element-preview/template-element-preview.component';

@Component({
  selector: 'accordion-element',
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    NgStyle,
    forwardRef(() => TemplateElementPreviewComponent),
  ],
  template: `
    <div class="accordion-element element-preview" [style]="accordionStyles">
      <div class="accordion-title" (click)="toggleAccordion($event)">
        {{ title }}
      </div>

      <div class="accordion-body" [ngClass]="{ isOpened: isOpened }">
        <template-element-preview
          *ngFor="let templateElement of content"
          [element]="templateElement"
        ></template-element-preview>
      </div>
    </div>
  `,
  styles: [
    `
      .accordion-element {
        border: 2px solid #000000;

        .accordion-title {
          border-bottom: 2px solid #000000;

          padding: 5px;
          text-align: center;
          font-weight: bold;
        }

        .accordion-body {
          min-height: 0;
          height: 0;

          &.isOpened {
            min-height: 100px;
            height: auto;
          }
        }
      }
    `,
  ],
})
export class AccordionElementComponent implements OnChanges {
  @Input() content?: TemplateElement[];
  @Input() styles?: Style[];
  @Input() title?: string;

  isOpened? = true;

  private styleManager = inject(StyleManagerService);
  accordionStyles: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.accordionStyles = this.styleManager.getStylesForNgStyle(
      this.styles ?? []
    );
  }

  toggleAccordion(event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.isOpened = !this.isOpened;
  }
}
