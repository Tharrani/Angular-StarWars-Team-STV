import { Component, OnInit } from '@angular/core';
import {itemcategory} from '../../models/categorymodel'
import { ActivatedRoute } from '@angular/router';

import {StarWarService} from '../../services/starwarsservice';
import {PagerService} from '../../services/pagination';

@Component({
  selector: 'app-categoryselect',
  templateUrl: './categoryselect.component.html',
  styleUrls: ['./categoryselect.component.css']
})
export class CategoryselectComponent implements OnInit {

  constructor(
    private starwarsvc: StarWarService,
    private route: ActivatedRoute,
    private pagersvc: PagerService) { }

  ngOnInit() {
    this.chosencategory="";
    this.selectedcategory();
  }

  categoryname: itemcategory[];
  pager: any = {};
  chosencategory: string;
  currentpage: number;

  selectedcategory(){
    this.chosencategory = this.route.snapshot.paramMap.get('name');
    this.starwarsvc.getCategory(this.chosencategory)
    .then((result:itemcategory[])=>{
      this.categoryname = result;
      this.setPage(1, true);
    }).catch(err=>{
      console.log('categoryselect error', err)
    });
  }

  setPage(page: number, first: boolean){
    this.pager = this.pagersvc.getPager(this.categoryname[0].count, page)
    if(this.pager.totalPages > 1 && first === false)
    {
      if(page<=0)
      {
          page=1;
      }
      else if(page>this.pager.totalPages)
      {
        page= this.pager.totalPages;
      }
      else{
        let url: string ='https://swapi.co/api/'+this.categoryname[0].category+'/?page='+page;
        this.starwarsvc.loopcategory(url, this.categoryname[0].category)
          .then((result: itemcategory[]) => {
          this.categoryname = result;
            })
          .catch(err => {
          console.error('>>> error: ', err);
           })
      }
      this.currentpage=page;
    }
  }  
}
