import {Component, EventEmitter, OnChanges, Output, SimpleChanges} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {NewsService} from "../../../user/news/news.service";
import {Router} from "@angular/router";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'add-news',
  templateUrl: 'add-news.component.html',
  styleUrls: ['add-news.component.scss']
})
export class AddNewsComponent{
  form: FormGroup;
  errors: string[] = [];
  isConfirmed = true;
  disabled = false;
  @Output() addEvent = new EventEmitter();

  constructor(
    private readonly newsService: NewsService
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(100)
      ]),
      'text': new FormControl('', [
        Validators.required,
        Validators.pattern('(?=.*[A-Za-z])^[A-Za-z]+[^\\>]*'),
        Validators.maxLength(500)
      ]),
      'photo': new FormControl(null, Validators.required)
    });
    window.scroll(0, 0);
  }

  onAddClick(){
    if(this.form.valid){
      const { title, text, photo } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.newsService.addNews(title, text, photo).pipe(
        catchError((err: HttpErrorResponse) => {
          this.isConfirmed = false;
          this.disabled = false;
          if(!this.errors.includes(err.error)){
            if(typeof err.error == "string") this.errors.push(err.error);
            else{
              let errors = err.error.errors;
              if(errors.title != undefined){
                errors.title.forEach((err: string) => this.errors.push(err));
              }
              if(errors.text != undefined){
                errors.text.forEach((err: string) => this.errors.push(err));
              }
              if(errors.photo != undefined){
                errors.photo.forEach((err: string) => this.errors.push(err));
              }
            }
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        let ref = document.getElementById('popup-close');
        ref = ref ? ref : new HTMLElement();
        ref.click();
        this.addEvent.emit();
      });
    }
  }

  onCloseClick(){
    this.form.patchValue({
      title: '',
      text: ''
    });
    this.disabled = false;
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
