import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BuilderEffects } from './+state/builder.effects';
import { builderReducer } from './+state/builder.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([BuilderEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: true }),

    StoreModule.forFeature('builder', builderReducer),
  ],
})
export class AppizyStoreModule {}
