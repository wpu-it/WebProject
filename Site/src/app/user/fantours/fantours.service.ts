import {Injectable} from "@angular/core";
import {FantoursApiService} from "../../api/fantours/fantours-api.service";
import {Observable, of} from "rxjs";
import {Fantour} from "./fantours.interfaces";
import {map, switchMap} from "rxjs/operators";
import {ApiFantour} from "../../api/fantours/fantours-api.interfaces";

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
          photoUrl: tour.photoUrl
        });
      })
    }
    return newFantours;
  }
}
