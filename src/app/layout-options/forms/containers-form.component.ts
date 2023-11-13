import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { SliderModule } from 'primeng/slider';

@Component({
  standalone: true,
  selector: 'container-options-form',
  imports: [FormsModule, ColorPickerModule, SliderModule],
  template: `
    <div class="mb-3 text-center">
      <label>Arrière plan</label>
      <p-colorPicker
        [(ngModel)]="backgroundColor"
        [inline]="true"
      ></p-colorPicker>
      <input
        type="text"
        class="form-control"
        [(ngModel)]="backgroundColor"
        [value]="backgroundColor"
      />
    </div>

    <div class="mb-3 text-center">
      <label>Arrondi bordure</label>
      <p-slider [(ngModel)]="borderRadius" [min]="0" [max]="50"></p-slider>
      <input
        type="text"
        class="form-control"
        [(ngModel)]="borderRadius"
        [value]="borderRadius"
      />
    </div>

    <button type="button" (click)="submit()" class="btn btn-primary btn-sm">
      Save
    </button>
  `,
  styles: [],
})
export class ContainersFormComponent implements OnChanges {
  @Input() styles?: { property: string; value: string }[];
  @Output() optionsSaved: EventEmitter<any> = new EventEmitter<any>();

  backgroundColor?: string;
  borderRadius?: number;

  ngOnChanges(): void {
    this.backgroundColor =
      this.styles?.find((style) => style.property === 'backgroundColor')
        ?.value ?? '';

    const borderRadiusStyle = this.styles?.find(
      (style) => style.property === 'borderRadius'
    );
    this.borderRadius = borderRadiusStyle
      ? parseInt(borderRadiusStyle.value.replace('px', ''))
      : 0;
  }

  submit(): void {
    this.optionsSaved.emit({
      styles: this.buildStyles(),
    });
  }

  private buildStyles(): { property: string; value: string }[] {
    const styles: { property: string; value: string }[] = [];

    if (this.backgroundColor) {
      styles.push({
        property: 'backgroundColor',
        value: this.backgroundColor,
      });
    }

    if (this.borderRadius && this.borderRadius !== 0) {
      styles.push({
        property: 'borderRadius',
        value: `${this.borderRadius}px`,
      });
    }

    return styles;
  }
}
