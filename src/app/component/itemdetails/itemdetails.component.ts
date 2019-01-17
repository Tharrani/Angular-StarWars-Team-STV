import { Component, OnInit } from '@angular/core';
import {StarWarService} from '../../services/starwarsservice';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {people,film,species,planet,starship,vehicle} from '../../models/categorymodel'

@Component({
  selector: 'app-itemdetails',
  templateUrl: './itemdetails.component.html',
  styleUrls: ['./itemdetails.component.css']
})
export class ItemdetailsComponent implements OnInit {

  constructor(
    private starwarsvc: StarWarService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getitemdetail();
  }

  people_detail: people;
  film_detail: film;
  starship_detail : starship;
  vehicle_detail: vehicle;
  planet_detail: planet;
  species_detail: species;
  category:string;

  getitemdetail(){
    this.category = this.route.snapshot.paramMap.get('category');
    let id = +this.route.snapshot.paramMap.get('id');
    switch(this.category)
    {
      case 'people':
      this.starwarsvc.getitempeople(this.category,id)
      .then((result: people) => {
        this.people_detail = result;
        this.people_detail.imgURL = 'assets/images/people/'+id+'.jpg'
        console.log('people result', this.people_detail)
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;

      case 'films':
      this.starwarsvc.getitemfilm(this.category,id)
      .then((result: film) => {
        this.film_detail = result;
        this.film_detail.imgURL='./assets/images/films/'+id+'.jpg';
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;

      case 'species':
      this.starwarsvc.getitemspecies(this.category, id)
      .then((result: species) => {
        this.species_detail = result;
        this.species_detail.imgURL='./assets/images/species/'+id+'.jpg';
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;

      case 'starships':
      this.starwarsvc.getitemstarship(this.category, id)
      .then((result: starship) => {
        this.starship_detail = result;
        this.starship_detail.imgURL='./assets/images/starships/'+id+'.jpg';
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;

      case 'vehicles':
      this.starwarsvc.getitemvehicle(this.category, id)
      .then((result: vehicle) => {
        this.vehicle_detail = result;
        this.vehicle_detail.imgURL='./assets/images/vehicles/'+id+'.jpg';
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;

      case 'planets':
      this.starwarsvc.getitemplanet(this.category, id)
      .then((result: planet) => {
        this.planet_detail = result;
        this.planet_detail.imgURL='./assets/images/planets/'+id+'.jpg';
      })
      .catch(err => {
        console.error('>>> error: ', err);
      })
      break;
    }
  }

  goBack(): void {
    this.location.back();
  }

  addtofav(URL: string){
      let tosearch = "https://swapi.co/api/";
      let ix = URL.indexOf(tosearch);
      let category = URL.substring(ix+tosearch.length, URL.indexOf("/",ix+1))
      console.log('category')
  }
}
