import {Component, Input} from "@angular/core";
import {Fantour} from "../../fantours/fantours.interfaces";

@Component({
  selector: 'order-fantour',
  templateUrl: 'order-fantour.component.html',
  styleUrls: ['order-fantour.component.scss']
})
export class OrderFantourComponent{
  @Input() fantour: Fantour;
}
