import {Component, EventEmitter, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BrowserLocalStorage} from "../../shared/storage/local-storage";

@Component({
  selector: 'sorting',
  templateUrl: 'sorting.component.html',
  styleUrls: ['sorting.component.scss']
})
export class SortingComponent{
  form: FormGroup;
  numbersForm: FormGroup;
  numbersErrors: string[] = []
  @Output() changeName = new EventEmitter();
  @Output() changeBorders = new EventEmitter();
  @Output() resetEvent = new EventEmitter();

  constructor(
    readonly localStorage: BrowserLocalStorage
  ) {
    this.form = new FormGroup({
      'search': new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ])
    });
    this.numbersForm = new FormGroup({
      'min': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ]),
      'max': new FormControl('', [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  changeNameEvent(){
    if(this.form.valid){
      const { search } = this.form.value;
      this.numbersForm.patchValue({
        min: '',
        max: ''
      })
      this.localStorage.setItem('search', search);
      this.localStorage.removeItem('price');
      this.changeName.emit(search);
    }
  }

  changeBordersEvent(){
    this.numbersErrors = [];
    const { min, max } = this.numbersForm.value;

    if(min > max) this.numbersErrors.push('Min > max');
    if(this.numbersForm.valid){
      if(this.numbersErrors.length == 0){
        this.form.patchValue({
          search: ''
        });
        this.localStorage.removeItem('search');
        this.localStorage.setItem('price', min + ' ' + max);
        this.changeBorders.emit({min: min, max: max});
      }
    }
    else{
      this.numbersErrors.push('Wrong value');
    }
  }

  resetClick(){
    this.localStorage.removeItem('search');
    this.localStorage.removeItem('price');
    this.form.patchValue({
      search: ''
    });
    this.numbersForm.patchValue({
      min: '',
      max: ''
    });
    this.resetEvent.emit();
  }

}
