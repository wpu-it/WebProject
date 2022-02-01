import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {FantoursModule} from "./user/fantours/fantours.module";
import {BrowserLocalStorage} from "./shared/storage/local-storage";
import {SharedModule} from "./shared.module";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FantoursModule,
    SharedModule
  ],
  providers: [
    BrowserLocalStorage
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
