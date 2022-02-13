import {Component, EventEmitter, Input, Output} from "@angular/core";
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
  @Output() editClick = new EventEmitter();
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
    this.editClick.emit(this.fantour.id);
  }

  onUpdatePhotoClick(){
    this.editClick.emit(this.fantour.id);
  }
}
