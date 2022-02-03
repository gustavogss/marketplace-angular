import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Film } from '../list-films/film-module';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public baseUrl: string = 'http://localhost:3001';
  public listFilm: Film[]= [];
  private _priceHandler:number = 0;
  public totalPrice: number=0;
  public listSelectedFilms: Film[] = [];

  getPrice(): number{
    return this._priceHandler;
  }

  setPrice(value: number){
    this._priceHandler = value;
  }

  private _filmHandler!: Film;

  getFilm(): Film {
    return this._filmHandler;
  }

  setFilm(value: Film){
    this._filmHandler = value;
  }

  constructor(private httpClient: HttpClient) {

   }

   getListFilms(): Observable<Film[]> {
     return this.httpClient.get<Film[]>(this.baseUrl+'/films')
   }

   selectFilm(){
     setTimeout(() => {
       this.totalPrice += this.getPrice();
       this.listSelectedFilms.push(this.getFilm())
       console.log(this.listSelectedFilms);
      }, 1);

    }

    unselectFilm(){
      this.totalPrice -= this.getPrice();
      if(this.totalPrice < 0){
        this.totalPrice = 0;
      }

      let index = this.listSelectedFilms.indexOf(this.getFilm());
      if(index > -1 || index === this.listSelectedFilms.indexOf(this.getFilm())){
        this.listSelectedFilms.splice(index, 1)
      }
      console.log(this.listSelectedFilms);
   }
}
