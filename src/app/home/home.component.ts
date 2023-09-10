import { Component } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movies:any;
  constructor(private service:MovieApiService) {}
  title = 'Movies_Project';

  ngOnInit() {
    this.service.get_Movies().subscribe(response => {
      
      this.movies = response;
    })
  }
}
