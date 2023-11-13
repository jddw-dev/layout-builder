import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { Style } from '../../core/models/style';

@Component({
  standalone: true,
  selector: 'text-options-form',
  imports: [FormsModule, SliderModule, RadioButtonModule],
  template: `
    <div>
      <div class="mb-3">
        <label>Text</label>
        <textarea class="form-control" [(ngModel)]="text"></textarea>
      </div>

      <div class="mb-3">
        <label>Taille</label>
        <p-slider [(ngModel)]="fontSize" [min]="10" [max]="50"></p-slider>
        <input
          type="text"
          class="form-control"
          [(ngModel)]="fontSize"
          [value]="fontSize"
        />
      </div>

      <div class="mb-3">
        <label>Alignement</label>
        <div class="flex flex-wrap gap-3">
          <div class="flex align-items-center">
            <p-radioButton
              inputId="textAlignLeft"
              name="textAlign"
              value="left"
              [(ngModel)]="textAlign"
            ></p-radioButton>
            <label for="textAlignLeft">Gauche</label>
          </div>

          <div class="flex align-items-center">
            <p-radioButton
              inputId="textAlignRight"
              name="textAlign"
              value="right"
              [(ngModel)]="textAlign"
            ></p-radioButton>
            <label for="textAlignRight">Droite</label>
          </div>

          <div class="flex align-items-center">
            <p-radioButton
              inputId="textAlignCenter"
              name="textAlign"
              value="center"
              [(ngModel)]="textAlign"
            ></p-radioButton>
            <label for="textAlignCenter">Centre</label>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary btn-sm" (click)="submit()">
        Save
      </button>
    </div>
  `,
  styles: [],
})
export class TextOptionsFormComponent implements OnChanges {
  @Input({ required: true }) text: string;
  @Input() styles?: Style[];
  @Output() optionsSaved: EventEmitter<any> = new EventEmitter<any>();

  // TODO : DRY ? Almost the same as TitleOptionsFormComponent
  fontSize?: number;
  textAlign?: string;

  ngOnChanges(): void {
    const fontSizeStyle = this.styles?.find(
      (style) => style.property === 'fontSize'
    );
    this.fontSize = fontSizeStyle
      ? parseInt(fontSizeStyle.value.replace('px', ''))
      : 14;

    this.textAlign =
      this.styles?.find((style) => style.property === 'textAlign')?.value ??
      'left';
  }

  submit(): void {
    this.optionsSaved.emit({
      text: this.text,
      styles: [
        {
          property: 'fontSize',
          value: `${this.fontSize}px`,
        },

        {
          property: 'textAlign',
          value: this.textAlign,
        },
      ],
    });
  }
}
