import {Component, EventEmitter, Input, Output} from "@angular/core";
import {News} from "../../../user/news/news.interfaces";
import {Router} from "@angular/router";
import {NewsService} from "../../../user/news/news.service";

@Component({
  selector: 'admin-new',
  templateUrl: 'admin-new.component.html',
  styleUrls: ['admin-new.component.scss']
})
export class AdminNewComponent{
  @Input() news: News;
  @Output() editClick = new EventEmitter();
  @Output() removeClick = new EventEmitter();

  constructor(){
  }

  onRemoveClick(){
    this.removeClick.emit(this.news.id);
  }

  onUpdateClick(){
    this.editClick.emit(this.news.id);
  }

  onUpdatePhotoClick(){
    this.editClick.emit(this.news.id);
  }
}
