import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item.interface';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'botton',
  templateUrl: './bottom.component.html',
  styleUrls: ['./bottom.component.css']
})
export class BottonComponent implements AfterViewInit, OnInit {
  @Input() data: Item;
  _rgba: string;
  _lightrgba: string;
  ngOnInit(): void {
    this._rgba = 'rgba(' + ColorService._getRGBA(this.data.color).join(',') + ')';
    this._lightrgba = 'rgba(' + ColorService._getRGBA(this.data.color).map((v,i,a)=>i==a.length-1?v=.4:v).join(',') + ')';
  }
  ngAfterViewInit(): void {

  }
}
