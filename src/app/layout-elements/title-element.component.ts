import { NgStyle } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { Style } from '../core/models/style';
import { StyleManagerService } from './../core/services/style-manager.service';

@Component({
  selector: 'title-element',
  standalone: true,
  imports: [NgStyle],
  template: `
    <h2 class="title-element" [style]="titleStyles">{{ title }}</h2>
  `,
  styles: [
    `
      .title-element {
        font-size: 30px;
      }
    `,
  ],
})
export class TitleElementComponent implements OnChanges {
  @Input() title?: string;
  @Input() styles?: Style[];

  private styleManager = inject(StyleManagerService);
  titleStyles: any;

  ngOnChanges(changes: SimpleChanges): void {
    this.titleStyles = this.styleManager.getStylesForNgStyle(this.styles ?? []);
  }
}
