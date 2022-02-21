import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-fantour-photo',
  templateUrl: 'update-fantour-photo.component.html',
  styleUrls: ['update-fantour-photo.component.scss']
})
export class UpdateFantourPhotoComponent{
  form: FormGroup;
  @Input() tourId: number;
  @Output() updateEvent = new EventEmitter();
  isConfirmed = true;
  disabled = false;
  errors: string[] = [];

  constructor(
    private readonly fantoursService: FantoursService
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  onEditClick(){
    if(this.form.valid){
      const { photo } = this.form.value;
      this.errors = [];
      this.disabled = true;
      if(photo.length < 1){
        this.isConfirmed = false;
        this.errors.push('Photo is required')
      }
      if(this.errors.length == 0){
        this.fantoursService.updateFantourPhoto(photo, this.tourId).pipe(
          catchError((err: HttpErrorResponse) => {
            this.isConfirmed = false;
            this.disabled = false;
            if(!this.errors.includes(err.error)){
              if(typeof err.error == "string") this.errors.push(err.error);
              else{
                let errors = err.error.errors;
                if(errors.photo != undefined){
                  errors.photo.forEach((err: string) => this.errors.push(err));
                }
              }
            }
            return [];
          }),
          take(1)
        ).subscribe(res => {
          let ref = document.getElementById('popup-3-close');
          ref = ref ? ref : new HTMLElement();
          ref.click();
          this.updateEvent.emit();
        });
      }
    }
  }


  onPhotoChange(event: any){
    let reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.form.patchValue({
          photo: reader.result
        });
      }
    }
  }
}
