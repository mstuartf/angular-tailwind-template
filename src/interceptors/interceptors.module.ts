import { NgModule } from '@angular/core';

import { TokenProvider } from './auth.interceptor';
import { UrlProvider } from './url.interceptor';


@NgModule({
  providers: [
  UrlProvider,
  TokenProvider]
})
export class InterceptorModule { }
