import { Injectable } from '@angular/core';
import Dexie from 'dexie';


export class DexieService extends Dexie {
    favorite: Dexie.Table<Ifavorite, string>;
    constructor() {
        super('Mydb');
        var db = this;
        db.version(1).stores({
            favorite: 'category,name,id,url'
          });
    }
}

export interface Ifavorite {
    category: string;
    name: string;
    id: number;
}

export var db = new DexieService();