import { Component, OnInit } from '@angular/core';
import { Film } from '../list-films/film-module';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  listSelectedFilms: Film[] = [];
  totalPrice!: number;
  disable = false;
  hide = true;
  form: any;

  constructor(private checkoutService: CheckoutService) { }

  ngOnInit(): void {

    this.totalPrice = this.checkoutService.totalPrice;
    this.listSelectedFilms = this.checkoutService.listSelectedFilms;
    this.toggleButton();
  }

  toggleButton(){
    if(this.listSelectedFilms.length == 0){
      this.disable = true;
    }
  }

  exclude(film: Film):void{
    this.totalPrice -= film.price;
    this.checkoutService.setFilm(film);
    this.checkoutService.unselectFilm();
    if(this.totalPrice <=0){
      this.excludeAll();
    }
  }

  excludeAll(){
    this.checkoutService.totalPrice = 0;
    this.totalPrice = 0;
    this.checkoutService.listSelectedFilms= [];
    this.listSelectedFilms = [];
    this.toggleButton();
  }

}
