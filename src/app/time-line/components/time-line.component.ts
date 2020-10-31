import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Decline } from '../interfaces/decline.iterface';
import { Item } from '../interfaces/item.interface';
import { Space } from '../interfaces/space.interface';
import { YearService } from '../services/year.service';

@Component({
  selector: 'time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit, AfterViewInit {
    public declines: Decline[];
    private items: Item[];
    private ys: YearService;
    private moving = true;
    constructor(){}
    ngAfterViewInit(): void {
        this.items.forEach(x=>{
            if ( document.getElementById(x.id.toString()))
                document.getElementById(x.id.toString()).style.background = x.color;
        });
    }
    ngOnInit(): void {
        this.items = [
            {
                id: 1,
                title: 'Квартира',
                svg: 'green',
                year: 2020,
                spend: 40000,
                color: 'red'
            } as Item,
            {
                id: 2,
                title: 'Недвижимость',
                svg: 'green',
                year: 2021,
                spend: 40000,
                color: 'red'
            } as Item,
            {
                id: 3,
                title: 'Ресторация',
                svg: 'red',
                year: 2025,
                spend: 40000,
                color: 'black'
            } as Item,
            {
                id: 4,
                title: 'Наследство',
                svg: 'blue',
                year: 2030,
                spend: 40000,
                color: 'blue'
            } as Item,
            {
                id: 5,
                title: 'Открытие фирмы',
                svg: 'blue',
                year: 2037,
                spend: 40000,
                color: 'lime'
            } as Item,
            {
                id: 6,
                title: 'Покупка Samsung Odesa',
                svg: 'blue',
                year: 2025,
                spend: 400,
                color: 'purple'
            } as Item,
            {
                id: 7,
                title: 'Черный день',
                svg: 'black',
                year: 2024,
                spend: 40330,
                color: 'green'
            } as Item
        ];
        this.ys = new YearService(new Date().getFullYear(),this.items.sort((x,y)=>y.year-x.year)[0].year+15,this.items);
        this._update();   
    }

    _update(){
        this.declines = this.ys._update(this.items);
    }
    drop(event: CdkDragDrop<String[]>) {
        if(!this.moving) return; 
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
    
          this.items.find(x=>x.id==((event.previousContainer.data[event.previousIndex] as Object) as Space).item.id).year = Number.parseInt(event.container.id);
          this._update();
          transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
      }


}
