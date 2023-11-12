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
  selector: 'title-options-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-3">
        <label>Title</label>
        <input class="form-control" formControlName="title" />
      </div>

      <button type="submit" class="btn btn-primary btn-sm">Save</button>
    </form>
  `,
  styles: [],
})
export class TitleOptionsFormComponent implements OnInit {
  @Input({ required: true }) title: string;
  @Output() optionsSaved: EventEmitter<any> = new EventEmitter<any>();

  private formBuilder = inject(FormBuilder);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.title),
    });
  }

  submit(): void {
    this.optionsSaved.emit(this.form.value);
  }
}
