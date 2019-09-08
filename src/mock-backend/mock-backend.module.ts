import { NgModule } from '@angular/core';

import { MockBackendProvider } from './mock-backend.interceptor';

@NgModule({
  providers: [
    MockBackendProvider
  ]
})
export class MockBackendModule { }
