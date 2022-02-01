import {Component} from "@angular/core";
import {FantoursService} from "./fantours.service";

@Component({
  selector: 'fantours',
  templateUrl: 'fantours.component.html',
  styleUrls: ['fantours.component.scss']
})
export class FantoursComponent{
  constructor(readonly fantoursService: FantoursService) {
  }
}
