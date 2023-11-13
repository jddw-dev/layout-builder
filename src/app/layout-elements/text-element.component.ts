import { NgStyle } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { Style } from '../core/models/style';
import { StyleManagerService } from '../core/services/style-manager.service';

@Component({
  selector: 'text-element',
  standalone: true,
  imports: [NgStyle],
  template: ` <p class="text-element" [style]="textStyles">{{ text }}</p> `,
  styles: [
    `
      .text-element {
        white-space: pre-wrap;
        font-size: 14px;
      }
    `,
  ],
})
export class TextElementComponent implements OnChanges {
  @Input() text?: string;
  @Input() styles?: Style[];

  // TODO : DRY ? Is the same for TitleElementComponent
  private styleManager = inject(StyleManagerService);
  textStyles: any;

  ngOnChanges(): void {
    this.textStyles = this.styleManager.getStylesForNgStyle(this.styles ?? []);
  }
}
