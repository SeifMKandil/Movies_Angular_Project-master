import { Component, OnInit } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  movies:any;
  isLoading = false;
  constructor(private service:MovieApiService) {}
  title = 'Movies_Project';

  ngOnInit() {
    this.isLoading=true;
    this.service.get_Movies().subscribe(response => {
      this.movies = response;
    })
    this.isLoading=false;
  }

}
