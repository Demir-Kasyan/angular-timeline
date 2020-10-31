import { Injectable } from '@angular/core';
import { Decline } from "../interfaces/decline.iterface";
import { Item } from '../interfaces/item.interface';
import { Space } from '../interfaces/space.interface';

@Injectable()
export class YearService{
    private declines: Decline[];
    constructor(private now: number, private max: number, private items: Item[]){}
    _update(items?: Item[]): Decline[]{
        this.items = items? items : this.items;
        this.max = this.items.sort((x,y)=>y.year-x.year)[0].year+15;
        this.declines = 
            Array.from(Array(Number.parseInt(((this.max - this.now)/10)
                 .toString().split('.')[0])+1).keys()).map(numb=>{
                     return { 
                        year: this.now+((numb+1)*10),
                        years: Array.from(Array(10).keys()).map(r=>{   
                        return {
                          year:  r+(this.now+(numb*10)),
                          spaces: this._items(r+(this.now+(numb*10))).map(x=>{
                            return {
                              spaces: [],
                              sun: 0,
                              item: x
                            }
                        })
                        }
                    })
                };
            });
        this._createSpace();
        return this.declines;
    }
    _createSpace(): void{
        this.declines.forEach(decline=>{
            decline.years.forEach(year=>{
                year.spaces.forEach(sp=>{
                    let space = this._smallSpace(sp);
                    sp.sun= space.sun;
                    sp.spaces = space.spaces;
                }) 
            })
        });
        this._validSpaces();
    }
    _validSpaces(): void{
        this.declines.forEach(decline=>{
            decline.years.forEach(year=>{
                if(year.spaces.length>1&&year.spaces.filter(x=>x.spaces.length==1).length==year.spaces.length){
                    year.spaces[0].spaces.pop();
                }
            })
        });
    }
    _smallSpace(year: Space): Space{
        let suns = []; let space = 0; let sun = 0; let stop = false;
        
        this.declines.filter(dec=>dec.year>=year.item.year && year.item.year<=dec.year+10).forEach(dec=>{
            dec.years.filter(ye=>
                ye.year==year.item.year)
        .forEach(ye=>{
              ye.spaces.map(sp => {
                    if(year.item.id!=sp.item.id){
                        if(sp.sun>0){
                            sun = sp.spaces.length+1;
                            space = 1;
                            stop = true;
                        }
                        else if(sp.sun==0){
                            suns.push(0);
                        }
                    }
                });
            });
            dec.years.filter(ye=>
                ye.year<year.item.year && (ye.year==year.item.year-1 || ye.year==year.item.year-2 ||
                ye.year==year.item.year-3 || ye.year==year.item.year-4 || ye.year==year.item.year-5 || ye.year==year.item.year-6))
        .forEach(ye=>{
                ye.spaces.forEach(sp => {
                    if(year.item.id!=sp.item.id){
                            suns.push(sp.sun);                        
                    }
                });
                
            })
        });
       if (!stop)
        for (let index = 0; index < suns.length+1; index++) {
            if(!suns.includes(index)){
                space = index;
                sun = space;
                break;
            }
        }
        return {
            sun: sun,
            item: year.item,
            spaces: Array.from(Array(space).keys())
        } as Space;
    }
    _items(year: number): Item[]{
        return this.items.filter(y=>y.year==year);
    }
}