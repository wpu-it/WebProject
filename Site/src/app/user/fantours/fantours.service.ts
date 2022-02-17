import {Injectable} from "@angular/core";
import {FantoursApiService} from "../../api/fantours/fantours-api.service";
import {Observable, of} from "rxjs";
import {Fantour} from "./fantours.interfaces";
import {map, switchMap, tap} from "rxjs/operators";
import {ApiFantour} from "../../api/fantours/fantours-api.interfaces";
import {JwtResponse} from "../../api/auth/auth-api.interfaces";
import {Router} from "@angular/router";

@Injectable()
export class FantoursService{
  fantours$: Observable<Fantour[]>;

  constructor(
    private readonly fantoursApiService: FantoursApiService
  ) {
    this.fantours$ = this.fantoursApiService.getAllFantours().pipe(
      map(fantours => {
        let newFantours: Fantour[] = this.mapFantours(fantours);
        return newFantours;
      })
    );
  }

  getFantourById(id: number){
    return this.fantoursApiService.getFantourById(id).pipe(
      map(tour => {
        return this.mapFantour(tour);
      })
    );
  }

  addFantour(title: string, description: string, schedule: string,
             priceWithoutTicket: string, ticketPrice: string, photo: string, quantity: number){
    return this.fantoursApiService.addFantour(title, description, schedule,
      priceWithoutTicket, ticketPrice, photo, quantity).pipe(
      map(fantours => {
        let newFantours: Fantour[] = this.mapFantours(fantours);
        return newFantours;
      }),
      tap((fantours: Fantour[]) => {
        this.fantours$ = of(fantours);
        window.scroll(0, 0);
      })
    );
  }

  updateFantour(id: number, title: string, description: string, schedule: string,
                priceWithoutTicket: string, ticketPrice: string, quantity: number){
    return this.fantoursApiService.updateFantour(id, title, description, schedule, priceWithoutTicket,
      ticketPrice, quantity).pipe(
      map(fantours => {
        return this.mapFantours(fantours);
      }),
      tap((fantours: Fantour[]) => {
        this.fantours$ = of(fantours);
      })
    );
  }

  updateFantourPhoto(newPhoto: string, fantourId: number){
    return this.fantoursApiService.updateFantourPhoto(newPhoto, fantourId).pipe(
      map(fantours => {
        let newFantours: Fantour[] = this.mapFantours(fantours);
        return newFantours;
      }),
      tap((fantours: Fantour[]) => {
        this.fantours$ = of(fantours);
        window.scroll(0, 0);
      })
    );
  }

  removeFantour(id: number){
    return this.fantoursApiService.removeFantour(id).pipe(
      map(fantours => {
        let newFantours: Fantour[] = this.mapFantours(fantours);
        return newFantours;
      }),
      tap((fantours: Fantour[]) => {
        this.fantours$ = of(fantours);
        window.scroll(0, 0);
      })
    );
  }


  mapFantours(fantours: ApiFantour[]) : Fantour[]{
    let newFantours: Fantour[] = []
    if(fantours.length > 0){
      fantours.forEach(tour => {
        newFantours.push({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          schedule: tour.schedule,
          priceWithoutTicket: tour.priceWithoutTicket,
          ticketPrice: tour.ticketPrice,
          photo: tour.photo,
          quantity: tour.quantity
        });
      })
    }
    return newFantours;
  }

  mapFantour(tour: ApiFantour){
    let result: Fantour = {
      id: tour.id,
      title: tour.title,
      description: tour.description,
      schedule: tour.schedule,
      priceWithoutTicket: tour.priceWithoutTicket,
      ticketPrice: tour.ticketPrice,
      photo: tour.photo,
      quantity: tour.quantity
    };
    return result;
  }
}
