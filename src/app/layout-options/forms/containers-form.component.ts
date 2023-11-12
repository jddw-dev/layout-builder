import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';

@Component({
  standalone: true,
  selector: 'container-options-form',
  imports: [FormsModule, ColorPickerModule],
  template: `
    <div class="mb-3">
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

    <button type="button" (click)="submit()" class="btn btn-primary btn-sm">
      Save
    </button>
  `,
  styles: [],
})
export class ContainersFormComponent implements OnInit {
  private destroy: DestroyRef = inject(DestroyRef);

  @Input() styles?: { property: string; value: string }[];
  @Output() optionsSaved: EventEmitter<any> = new EventEmitter<any>();

  backgroundColor?: string;

  ngOnInit(): void {
    this.backgroundColor =
      this.styles?.find((style) => style.property === 'backgroundColor')
        ?.value ?? '';
  }

  submit(): void {
    this.optionsSaved.emit({
      styles: [
        {
          property: 'backgroundColor',
          value: this.backgroundColor,
        },
      ],
    });
  }
}
