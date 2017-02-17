import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { DemoComponent }  from './demo.component';
import { OtherComponent }  from './other.component';



const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DemoComponent
  },
  {
    path: 'other',
    component: OtherComponent
  },
  {
    path: 'demo',
    component: DemoComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);