import {Component, Input} from "@angular/core";
import {Fantour} from "../../../user/fantours/fantours.interfaces";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {Router} from "@angular/router";

@Component({
  selector: 'admin-fantour',
  templateUrl: 'admin-fantour.component.html',
  styleUrls: ['admin-fantour.component.scss']
})
export class AdminFantourComponent{
  @Input() fantour: Fantour;
  constructor(
    private readonly fantoursService: FantoursService,
    private readonly router: Router
  ) {

  }

  onRemoveClick(){
    let path = 'admin/fantours/remove/' + this.fantour.id;
    this.router.navigate([path]);
  }

  onUpdateClick(){
    this.router.navigate(['admin/fantours/edit/' + this.fantour.id]);
  }

  onUpdatePhotoClick(){
    this.router.navigate(['admin/fantours/edit/photo/' + this.fantour.id]);
  }
}
