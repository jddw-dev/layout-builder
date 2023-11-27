import { NgClass, NgSwitch, NgSwitchCase } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { DragDropModule } from 'primeng/dragdrop';
import { TemplateElement } from '../core/models/template-element';
import { StyleManagerService } from '../core/services/style-manager.service';
import { AccordionElementComponent } from '../layout-elements/accordion-element.component';
import { ColElementComponent } from '../layout-elements/col-element.component';
import { DividerElementComponent } from '../layout-elements/divider-element.component';
import { MainElementComponent } from '../layout-elements/main-element.component';
import { RowElementComponent } from '../layout-elements/row-element.component';
import { TextElementComponent } from '../layout-elements/text-element.component';
import { TitleElementComponent } from '../layout-elements/title-element.component';
import { BuilderFacade } from './../+state/builder.facade';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SheetElementComponent } from '../layout-elements/sheet-element.component';

@Component({
  imports: [
    MainElementComponent,
    RowElementComponent,
    ColElementComponent,
    AccordionElementComponent,
    TitleElementComponent,
    TextElementComponent,
    DividerElementComponent,
    SheetElementComponent,
    DragDropModule,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    LetDirective,
    FontAwesomeModule,
  ],
  selector: 'template-element-preview',
  template: `
    <div
      *ngrxLet="selectedElement$ as selectedElement"
      [id]="element.id"
      [ngSwitch]="element.type"
      pDroppable
      class="element-wrapper element-wrapper__{{ element.type }}"
      [ngClass]="{
        ghost: element.isGhost,
        selected: selectedElement?.id === element.id
      }"
      [style]="styles"
      (onDrop)="drop($event)"
      (onDragEnter)="dragEnter($event)"
      (click)="click($event)"
    >
      <main-element
        *ngSwitchCase="'main'"
        [content]="element.content"
      ></main-element>

      <row-element
        *ngSwitchCase="'row'"
        [content]="element.content"
      ></row-element>

      <col-element
        *ngSwitchCase="'column'"
        [content]="element.content"
      ></col-element>

      <accordion-element
        *ngSwitchCase="'accordion'"
        [content]="element.content"
        [title]="element.title"
        [styles]="element.styles"
      ></accordion-element>

      <divider-component *ngSwitchCase="'divider'"></divider-component>

      <title-element
        *ngSwitchCase="'title'"
        [title]="element.title"
        [styles]="element.styles"
      ></title-element>

      <text-element
        *ngSwitchCase="'text'"
        [text]="element.text"
        [styles]="element.styles"
      ></text-element>

      <sheet-element *ngSwitchCase="'sheet'"></sheet-element>

      <fa-icon
        [icon]="faTrash"
        class="delete-icon"
        (click)="removeElement($event, element.id!)"
      ></fa-icon>
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
      }

      .element-wrapper {
        cursor: pointer;

        border: #cccccc dashed 2px;
        margin: 20px 10px;

        &__row {
          border: none;
        }

        .selected {
          background: rgba(0, 255, 0, 0.5);
        }

        .ghost {
          background: #000000;
          opacity: 0.3;
        }

        position: relative;

        .delete-icon {
          position: absolute;
          top: 5px;
          right: 5px;

          z-index: 0;
        }

        &__main > .delete-icon,
        &__row > .delete-icon {
          display: none;
        }
      }
    `,
  ],
  standalone: true,
})
export class TemplateElementPreviewComponent implements OnChanges {
  @Input({ required: true }) element: TemplateElement;

  private elementRef = inject(ElementRef);

  private builderFacade = inject(BuilderFacade);
  selectedElement$ = this.builderFacade.selectedElement$;

  private styleManager = inject(StyleManagerService);
  styles: any;

  faTrash = faTrash;

  ngOnChanges(changes: SimpleChanges): void {
    this.styles = this.styleManager.getStylesForNgStyle(
      this.element.styles ?? []
    );
  }

  drop(event: any) {
    // Prevent drop on itself
    if (this.element.isGhost) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Can the element accepts drop ?
    if (!this.element.acceptDrop) {
      return;
    }

    const insertAfterId = this.getInsertAfterId(event);

    if (this.element.id) {
      this.builderFacade.drop(this.element.id, insertAfterId);
    }
  }

  private getInsertAfterId(event: any): string | null {
    const dropPosition = { x: event.clientX, y: event.clientY };

    // Get element children
    let children =
      this.elementRef.nativeElement.children[0]?.children[0]?.children[0]
        ?.children;

    // Accordion specific case
    // TODO : find a better way to handle this ?
    if (this.element.type === 'accordion') {
      children = children[1]?.children;
    }

    let insertAfterId: string | null = null;
    if (children) {
      for (const child of children) {
        const childElement = child.children[0];
        if (childElement.className.includes('ghost')) {
          // Ignore ghost element
          continue;
        }

        const childId = childElement.id;
        const childPosition = childElement.getBoundingClientRect();

        if (childPosition.bottom <= dropPosition.y) {
          insertAfterId = childId;
        }
      }
    }

    return insertAfterId;
  }

  dragEnter(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.element.isGhost || !this.element.acceptDrop) {
      return;
    }

    const insertAfterId = this.getInsertAfterId(event);
    if (this.element.id) {
      this.builderFacade.displayGhost(this.element.id, insertAfterId);
    }
  }

  // TODO : unselect element when click outside !
  click(event: any) {
    event.preventDefault();
    event.stopPropagation();

    if (this.element.id) {
      this.builderFacade.selectElement(this.element);
    }
  }

  removeElement(e: any, id: string) {
    e.preventDefault();
    e.stopPropagation();

    this.builderFacade.removeElement(id);
  }
}
