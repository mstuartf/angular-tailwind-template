import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects'

import { UserService } from './user.service';
import { userReducer } from './user.reducer';
import { UserEffects } from './user.effects';


@NgModule({
    imports: [
        StoreModule.forFeature('user', userReducer),
        EffectsModule.forFeature([UserEffects])
    ],
    providers: [UserService]
})
export class UserModule { }
