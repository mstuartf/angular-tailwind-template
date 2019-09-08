import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'external', pathMatch: 'full' },
  { path: 'internal', loadChildren: './internal/internal.module#InternalPageModule' },
  { path: 'external', loadChildren: './external/external.module#ExternalPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
