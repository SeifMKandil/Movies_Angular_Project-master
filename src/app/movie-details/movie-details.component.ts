import { Component } from '@angular/core';
import { MovieApiService } from '../services/movie-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {

  movieDetail:any;
  movieDetailAr:any;
  isArabic?:boolean;
  
  
  constructor(private service:MovieApiService , private route: ActivatedRoute) {
    
  }
  title = 'Movies_Project';
  id = this.route.snapshot.params['id'];
  private detailUrlEn  = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=f2d7215515a34f350462609e31a408ef';
  
  private detailUrlAr  = 'https://api.themoviedb.org/3/movie/' + this.id + '?api_key=f2d7215515a34f350462609e31a408ef&language=ar';
  
  currentLang = localStorage.getItem('currentLang');
  // values = JSON.parse(localStorage.getItem("store_owner_ad_contacts"));
  ngOnInit() {
    this.service.get_Movies_Details(this.detailUrlEn).subscribe(response => {
      this.movieDetail = response;
    })

    this.service.get_Movies_Details(this.detailUrlAr).subscribe(response => {
      this.movieDetailAr = response;

      

      if(this.currentLang == 'ar'){
        this.isArabic =true;
      }else{
        
      }

      
    })


   


}
}