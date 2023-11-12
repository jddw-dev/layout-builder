import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'text-options-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-3">
        <label>Text</label>
        <textarea class="form-control" formControlName="text">{{
          text
        }}</textarea>
      </div>

      <button type="submit" class="btn btn-primary btn-sm">Save</button>
    </form>
  `,
  styles: [],
})
export class TextOptionsFormComponent implements OnInit {
  @Input({ required: true }) text: string;
  @Output() optionsSaved: EventEmitter<any> = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      text: new FormControl(this.text),
    });
  }

  submit(): void {
    this.optionsSaved.emit(this.form.value);
  }
}
