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

  getPrice(): number{
    return this._priceHandler;
  }

  setPrice(value: number){
    this._priceHandler = value;
  }

  constructor(private httpClient: HttpClient) {

   }

   getListFilms(): Observable<Film[]> {
     return this.httpClient.get<Film[]>(this.baseUrl+'/films')
   }

   selectFilm(){
     setTimeout(() => {
       this.totalPrice += this.getPrice();
     }, 1);

   }

   unselectFilm(){
     this.totalPrice -= this.getPrice();
     if(this.totalPrice < 0){
      this.totalPrice = 0;
    }

   }
}
