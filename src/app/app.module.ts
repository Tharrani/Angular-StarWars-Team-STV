import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {StarWarService} from './services/starwarsservice';
import {PagerService} from './services/pagination';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatGridListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CategorylistComponent } from './component/categorylist/categorylist.component';
import { CategoryselectComponent } from './component/categoryselect/categoryselect.component';
import { ItemdetailsComponent } from './component/itemdetails/itemdetails.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full'
  },
  {
    path: 'Home',
    component: CategorylistComponent
  },
  {
    path: 'category/:name',
    component: CategoryselectComponent
  },
  {
    path: 'Characters/:category/:id',
    component: ItemdetailsComponent
  },
  {
    path: 'Films/:category/:id',
    component: ItemdetailsComponent
  },
  {
    path: 'Species/:category/:id',
    component: ItemdetailsComponent
  },
  {
    path: 'Starships/:category/:id',
    component: ItemdetailsComponent
  },
  {
    path: 'Vehicles/:category/:id',
    component: ItemdetailsComponent
  },
  {
    path: 'Planets/:category/:id',
    component: ItemdetailsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CategorylistComponent,
    CategoryselectComponent,
    ItemdetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  providers: [StarWarService, PagerService],
  bootstrap: [AppComponent],
  exports:[ RouterModule]
})
export class AppModule { }
