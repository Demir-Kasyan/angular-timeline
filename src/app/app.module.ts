import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgTimelineModule } from 'ng-timeline-dk/src/public-api'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,NgTimelineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
