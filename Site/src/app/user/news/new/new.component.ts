import {Component, Input} from "@angular/core";
import {News} from "../news.interfaces";

@Component({
  selector: 'new',
  templateUrl: 'new.component.html',
  styleUrls: ['new.component.scss']
})
export class NewComponent{
  @Input() news: News;
}
