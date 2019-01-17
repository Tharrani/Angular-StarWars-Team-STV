export interface categoryList{
    name: string;
}

export interface itemcategory{
    category: string;
    name: string;
    id: number;
    count: number;
    url: string;
}

export interface people{
    name: string;
    birth_year: string;
    species: string[];
    height: string;
    mass: string;
    gender: string;
    hair_color: string;
    skin_color: string;
    homeworld: string;
    imgURL: string;
}

export interface film{
    title: string;
    episode_id : number;
    opening_crawl : string;
    director: string;
    producer: string;
    release_date: Date;
    characters: string[];
    planets : string [];
    species : string [];
    imgURL: string;
}

export interface starship{
    name: string;
    model: string;
    starship_class: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    pilots: string[];
    imgURL: string;
}

export interface vehicle{
    name: string,
    model : string,
    vehicle_class : string,
    manufacturer : string,
    length : string,
    cost_in_credits : string,
    crew : string,
    passengers : string,
    max_atmosphering_speed : string,
    cargo_capacity : string,
    consumables : string,
    pilots: string[],
    imgURL: string;
}

export interface planet{
    name:string,
    diameter : string,
    rotation_period: string,
    orbital_period : string,
    gravity: string,
    population : string,
    climate : string,
    terrain : string,
    surface_water : string,
    imgURL: string;
}

export interface species{
    name: string,
    classification : string,
    designation : string,
    average_height : string,
    average_lifespan : string,
    eye_colors : string,
    hair_colors : string,
    skin_colors : string,
    language : string,
    homeworld: string,
    imgURL: string;
}
