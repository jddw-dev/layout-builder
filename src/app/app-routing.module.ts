import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBuilderComponent } from './layout-builder/layout-builder.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBuilderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
