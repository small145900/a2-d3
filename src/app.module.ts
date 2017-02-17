import { NgModule }      from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { DemoComponent }  from './demo.component';
import { OtherComponent }  from './other.component';

import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routing';


@NgModule({
  imports: [ 
  	BrowserModule,
    FormsModule,
    HttpModule,
  	routing
  ],
  declarations: [ 
  	AppComponent,
    DemoComponent,
    OtherComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
