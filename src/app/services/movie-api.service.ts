import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private baseUrl = 'https://api.themoviedb.org/3/movie/top_rated?api_key=f2d7215515a34f350462609e31a408ef';

  constructor(private httpClient: HttpClient) { }

  get_Movies(){
      return this.httpClient.get(this.baseUrl);
  }
  
  get_Movies_Details(detailUrl:string){
    return this.httpClient.get(detailUrl);
  }
}
