import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {EnvironmentModel} from "../../../environments/environment.model";
import {Observable} from "rxjs";
import {ApiFantour} from "./fantours-api.interfaces";
import {publishReplay, refCount} from "rxjs/operators";

@Injectable()
export class FantoursApiService{
    constructor(
      private readonly httpClient: HttpClient,
      private readonly env: EnvironmentModel
    ) {
    }

    getAllFantours(): Observable<ApiFantour[]>{
      return this.httpClient.get<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours',
        'get-all'
      ].join('/')).pipe(
          publishReplay(1),
          refCount()
      );
    }

    getFantourById(id: number){
      return this.httpClient.get<ApiFantour>([
        this.env.fantoursAPI,
        'fantours',
        'get'
      ].join('/'),
        {
          params:{
            id: id
          }
        }).pipe(
        publishReplay(1),
        refCount()
      );
    }

    addFantour(title: string, description: string, schedule: string,
               priceWithoutTicket: string, ticketPrice: string, photo: string, quantity: number) : Observable<ApiFantour[]>{
      return this.httpClient.post<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours'
      ].join('/'),
        {
          title,
          description,
          schedule,
          priceWithoutTicket,
          ticketPrice,
          photo,
          quantity
        }).pipe(
        publishReplay(1),
        refCount()
      );
    }

    updateFantour(id: number, title: string, description: string, schedule: string,
                  priceWithoutTicket: string, ticketPrice: string, quantity: number){
      return this.httpClient.put<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours',
        'update'
      ].join('/'),
        {
          id: id,
          title: title,
          description: description,
          schedule: schedule,
          ticketPrice: ticketPrice,
          priceWithoutTicket: priceWithoutTicket,
          quantity: quantity
        }).pipe(
        publishReplay(1),
        refCount()
      );
    }

    updateFantourPhoto(newPhoto: string, fantourId: number){
      return this.httpClient.put<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours',
        'update',
        'photo'
      ].join('/'),{
        newPhoto: newPhoto,
        fanTourId: fantourId
      }).pipe(
        publishReplay(1),
        refCount()
      );
    }

    removeFantour(id: number){
      return this.httpClient.delete<ApiFantour[]>([
        this.env.fantoursAPI,
        'fantours',
        id
      ].join('/')).pipe(
        publishReplay(1),
        refCount()
      );
    }
}
