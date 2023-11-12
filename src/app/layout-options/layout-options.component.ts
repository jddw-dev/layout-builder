import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TemplateElement } from '../core/models/template-element';
import { BuilderFacade } from './../+state/builder.facade';

@Component({
  standalone: true,
  selector: 'layout-options',
  imports: [ReactiveFormsModule],
  template: `
    <h2 class="text-center">Options</h2>
    <h3 class="text-center">{{ selectedElement.type }}</h3>

    <form [formGroup]="form" (ngSubmit)="submit()">
      <div class="mb-3">
        <label>Title</label>
        <input type="text" formControlName="title" />
      </div>

      <button class="btn btn-primary" type="submit">Save</button>
    </form>
  `,
  styles: [],
})
export class LayoutOptionsComponent implements OnChanges {
  @Input({ required: true }) selectedElement: TemplateElement;

  private formBuilder = inject(FormBuilder);
  private builderFacade = inject(BuilderFacade);

  form!: FormGroup;

  ngOnChanges(changes: SimpleChanges): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.selectedElement.title),
    });
  }

  submit(): void {
    // TODO : extends to all options
    this.builderFacade.updateElement({
      ...this.selectedElement,
      title: this.form.value.title,
    });
  }
}
