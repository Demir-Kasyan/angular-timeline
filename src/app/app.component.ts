import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tl-npm';
  object = [{
    id: 1,
    title: 'lol',
    color: 'red',
    svg: 'assets/svg.svg',
    year: 2022,
    spend: 30000
  }];
  callback(e){
    console.log(e);
  }
}
