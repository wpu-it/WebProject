import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Fantour} from "../fantours.interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'fantour',
  templateUrl: 'fantour.component.html',
  styleUrls: ['fantour.component.scss']
})
export class FantourComponent{
  @Input() fantour: Fantour;

  constructor(
    private readonly router: Router
  ) {
  }


  onMakeOrderClick(){
    this.router.navigate(['order/new'], {queryParams: {tourId: this.fantour.id}});
  }
}
