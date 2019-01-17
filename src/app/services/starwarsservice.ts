import {Injectable} from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import {itemcategory, people, film, starship, planet, species, vehicle} from '../models/categorymodel'

@Injectable()
export class StarWarService{

    constructor(private http: HttpClient){    }
    
    getCategory (category){
        let c : string;
        switch(category)
        {
            case 'Characters':
            c = 'people';
            break;
            case 'Films':
            c = 'films';
            break;
            case 'Species':
            c = 'species';
            break;
            case 'Starships':
            c = 'starships';
            break;
            case 'Vehicles':
            c= 'vehicles';
            break;
            case 'Planets':
            c = 'planets';
            break;
        }
        let url : string = 'https://swapi.co/api/'+c+'/';
        return(
        this.http.get<itemcategory[]>(url)
        .toPromise()
        .then((data)=>{
          const w : itemcategory[]=[];  
            for (let i of data['results'])
               {
                    w.push({
                        category: c,
                        name: i['name'] || i['title'],
                        id: i['url'].match(/([0-9])+/g)[0],
                        count : data['count'],
                        url: data['url']
                    })
            
                }
                return (w);
            })
        )
    }

    loopcategory(purl: string, c: string){
        return(
            this.http.get<itemcategory[]>(purl)
            .toPromise()
            .then((data)=>{
              const w : itemcategory[]=[];  
              
                for (let i of data['results'])
                   {
                        w.push({
                            category: c,
                            name: i['name'] || i['title'],
                            id:i['url'].match(/([0-9])+/g)[0],
                            count : data['count'],
                            url: data['url']
                        })
                    }
                    return (w);
                })
            )
    }

    getitempeople (category: string, index: number, link?:string){
        var urlpp: string;
        if(link == null)
        {urlpp  = 'https://swapi.co/api/'+category+'/'+index+'/';}
        else{ urlpp = link;}
            return(
                this.http.get<people>(urlpp)
                .toPromise()
                .then((data)=>{
                    console.log(' people data ', data);
                  //  console.log('species length', data.films.length)
                      var p = {
                        name: data.name,
                        birth_year: data.birth_year,
                        species: [],
                        height: data.height,
                        mass: data.mass,
                        gender: data.gender,
                        hair_color: data.hair_color,
                        skin_color: data.skin_color,
                        homeworld: '',
                    }
                    //to get planet name
                    this.getitemplanet('planets', 0 ,data.homeworld).then((result: planet) => {
                        p.homeworld = result.name;
                      })
                      .catch(err => {
                        console.error('>>> planet name error: ', err);
                      })
                    //to get species name
                    if(data.species.length>0)
                    {
                    for(let i of data.species){
                        this.getitemspecies('species', 0, i).then((result: species) => {
                            p.species.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> species name error: ', err);
                          })    
                        }
                        console.log('p.species', p.species)
                    }
                    else{ p.species.push('None')}
                    return (p);
                    })
                )
        }

    getitemplanet (category: string, index: number, link?: string){
            var urlpl: string;
            if(link == null)
            {urlpl  = 'https://swapi.co/api/'+category+'/'+index+'/';}
            else{ urlpl = link;}
                return(
                    this.http.get<planet>(urlpl)
                    .toPromise()
                    .then((data)=>{
                        console.log('planet data ', data);
                      //  console.log('species length', data.films.length)
                          var p = {
                            name: data.name,
                            diameter : data.diameter,
                            rotation_period: data.rotation_period,
                            orbital_period : data.orbital_period,
                            gravity: data.gravity,
                            population : data.population,
                            climate : data.climate,
                            terrain : data.terrain,
                            surface_water : data.surface_water,
                            imgURL: ''
                        }
                        return (p);
                        })
                    )
        } 
    
    getitemspecies (category: string, index: number, link?: string){
            var urlsp: string;
            if(link == null)
            {urlsp  = 'https://swapi.co/api/'+category+'/'+index+'/';
            console.log('urlsp', urlsp)}
            else{ urlsp = link;
                console.log('link', link)}
                return(
                    this.http.get<species>(urlsp)
                    .toPromise()
                    .then((data)=>{
                        console.log('species data ', data);
                      //  console.log('species length', data.films.length)
                          var p = {
                            name: data.name,
                            classification : data.classification,
                            designation : data.designation,
                            average_height : data.average_height,
                            average_lifespan : data.average_lifespan,
                            eye_colors : data.eye_colors,
                            hair_colors : data.hair_colors,
                            skin_colors : data.skin_colors,
                            language : data.language,
                            homeworld: '',
                            imgURL: ''
                        }
                        //to get planet name
                    this.getitemplanet('planets', 0 ,data.homeworld).then((result: planet) => {
                        p.homeworld = result.name;
                      })
                      .catch(err => {
                        console.error('>>> planet name error: ', err);
                      })
                        return (p);
                        })
                    )
    }
    
    getitemvehicle(category: string, index: number, link?: string){
        var urlvh: string;
        if(link == null)
        {urlvh  = 'https://swapi.co/api/'+category+'/'+index+'/';
        console.log('urlvh', urlvh)}
        else{ urlvh = link;
            console.log('link', link)}
            return(
                this.http.get<vehicle>(urlvh)
                .toPromise()
                .then((data)=>{
                    console.log('vehicle data ', data);
                  //  console.log('species length', data.films.length)
                      var p = {
                        name: data.name,
                        model : data.model,
                        vehicle_class : data.vehicle_class,
                        manufacturer : data.manufacturer,
                        length : data.length,
                        cost_in_credits : data.cost_in_credits,
                        crew : data.crew,
                        passengers : data.passengers,
                        max_atmosphering_speed : data.max_atmosphering_speed,
                        cargo_capacity : data.cargo_capacity,
                        consumables : data.consumables,
                        pilots: [],
                        imgURL: ''
                    }
                    //to get people name
                    if(data.pilots.length>0){
                    for(let i of data.pilots){
                        this.getitempeople('people', 0, i).then((result: people) => {
                            p.pilots.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> people name error: ', err);
                          })    
                        }
                    }
                    else{
                        p.pilots.push('None');
                    }
                    return (p);
                    })
                )
    }

    getitemstarship(category: string, index: number, link?: string){
        var urlss: string;
        if(link == null)
        {urlss  = 'https://swapi.co/api/'+category+'/'+index+'/';
        console.log('urlss', urlss)}
        else{ urlss = link;
            console.log('link', link)}
            return(
                this.http.get<starship>(urlss)
                .toPromise()
                .then((data)=>{
                    console.log('starship data ', data);
                  //  console.log('species length', data.films.length)
                      var p = {
                        name: data.name,
                        model: data.model,
                        starship_class: data.starship_class,
                        cost_in_credits: data.cost_in_credits,
                        length: data.length,
                        crew: data.crew,
                        passengers: data.passengers,
                        max_atmosphering_speed: data.max_atmosphering_speed,
                        MGLT: data.MGLT,
                        cargo_capacity: data.cargo_capacity,
                        hyperdrive_rating: data.hyperdrive_rating,
                        pilots:[],
                        imgURL: ''
                    }
                    //to get people name
                    if(data.pilots.length>0){
                    for(let i of data.pilots){
                        this.getitempeople('people', 0, i).then((result: people) => {
                            p.pilots.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> people name error: ', err);
                          })    
                        }
                    }
                    else
                    {p.pilots.push('None')}
                    return (p);
                    })
            )
    }

    getitemfilm(category: string, index: number, link?: string){
        var urlfl: string;
        if(link == null)
        {urlfl  = 'https://swapi.co/api/'+category+'/'+index+'/';
        console.log('urlfl', urlfl)}
        else{ urlfl = link;
            console.log('link', link)}
            return(
                this.http.get<film>(urlfl)
                .toPromise()
                .then((data)=>{
                    console.log('film data ', data);
                  //  console.log('species length', data.films.length)
                      var p = {
                        title: data.title,
                        episode_id : data.episode_id,
                        opening_crawl : data.opening_crawl,
                        director: data.director,
                        producer: data.producer,
                        release_date: data.release_date,
                        characters: [],
                        planets : [],
                        species : [],
                        imgURL: ''
                    }
                    //to get people name
                    if(data.characters.length>0){                    
                    for(let i of data.characters){
                        this.getitempeople('people', 0, i).then((result: people) => {
                            p.characters.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> people name error: ', err);
                          })    
                        }
                    } else{p.characters.push('None');}
                    //to get planet name
                    if(data.planets.length>0)
                    {
                    for(let i of data.planets){
                        this.getitemplanet('planets', 0, i).then((result: planet) => {
                            p.planets.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> planet name error: ', err);
                          })    
                        }
                    }else{p.planets.push('None');}
                    //to get species name
                    if(data.species.length>0){
                    for(let i of data.species){
                        this.getitemspecies('species', 0, i).then((result: species) => {
                            p.species.push(result.name);
                          })
                          .catch(err => {
                            console.error('>>> planet name error: ', err);
                          })    
                        }
                    }else{ p.species.push('None');}
                    return (p);
                    })
            )
    }
}