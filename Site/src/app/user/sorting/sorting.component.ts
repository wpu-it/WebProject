import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'sorting',
  templateUrl: 'sorting.component.html',
  styleUrls: ['sorting.component.scss']
})
export class SortingComponent{
  form: FormGroup;
  constructor(
  ) {
    this.form = new FormGroup({
      'search': new FormControl('', Validators.required)
    })
  }

  onSearchClick(){
    if(this.form.valid){
      const { search } = this.form.value;

    }
  }
}
