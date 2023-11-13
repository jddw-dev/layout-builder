import { Injectable } from '@angular/core';
import { Style } from '../models/style';

@Injectable({ providedIn: 'root' })
export class StyleManagerService {
  getStylesForNgStyle(stylesAsArr: Style[]): any {
    const styles: any = {};

    stylesAsArr.forEach((style: Style) => {
      styles[style.property] = style.value;
    });

    return styles;
  }
}
