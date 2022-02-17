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
  @Output() removeClick = new EventEmitter();
  constructor(
  ) {

  }

  onRemoveClick(){
    this.removeClick.emit(this.fantour.id);
  }

  onUpdateClick(){
    this.editClick.emit(this.fantour.id);
  }

  onUpdatePhotoClick(){
    this.editClick.emit(this.fantour.id);
  }
}
