import { MovieApiService } from './services/movie-api.service';
import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { FirebaseAuthService } from './services/firebase-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  movies:any;
  constructor(private service:MovieApiService ,  private authServive:FirebaseAuthService ) {}
  title = 'Movies_Project';

  ngOnInit() {
    this.authServive.autoLogin();
    this.service.get_Movies().subscribe(response => {
      this.movies = response;
    })
  }
}
