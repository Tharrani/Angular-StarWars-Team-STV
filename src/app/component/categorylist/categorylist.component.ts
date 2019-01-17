import { Component, OnInit } from '@angular/core';
import {categoryList} from '../../models/categorymodel'

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategorylistComponent implements OnInit {

  constructor() { }
  
  categorylist: categoryList [] = [
    {name: 'Characters'},
    {name: 'Films'}, 
    {name: 'Species'},
    {name: 'Starships'},
    {name: 'Vehicles'},
    {name: 'Planets'}
  ];

  ngOnInit() {
  }

  categoryselect($event: string){
    console.log('category selected', $event);
  }

}
