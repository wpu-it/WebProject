import {Component, Input} from "@angular/core";
import {Fantour} from "../fantours.interfaces";

@Component({
  selector: 'fantour',
  templateUrl: 'fantour.component.html',
  styleUrls: ['fantour.component.scss']
})
export class FantourComponent{
  @Input() fantour: Fantour;
}
