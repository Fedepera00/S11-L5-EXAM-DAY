import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../Services/movie.service';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  providers: [
    MovieService
  ]
})
export class HomeModule { }
