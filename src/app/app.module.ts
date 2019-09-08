import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {MockBackendModule} from '../mock-backend/mock-backend.module';
import {InterceptorModule} from '../interceptors/interceptors.module';

import {ApiService} from '../providers/api/api.service';

import {HttpClientModule} from '@angular/common/http';

import {UserModule} from '../providers/user/user.module';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {metaReducer} from '../state/meta.reducer';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        InterceptorModule,
        MockBackendModule,
        HttpClientModule,
        UserModule,
        StoreModule.forRoot({}, {metaReducers: [metaReducer]}),
        EffectsModule.forRoot([]),
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
