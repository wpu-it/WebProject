import {Component} from "@angular/core";
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
  disabled = false;
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;

  constructor(
    private readonly newsService: NewsService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'text': new FormControl('', Validators.required),
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
            this.errors.push(err.error);
          }
          return [];
        }),
        take(1)
      ).subscribe(res => {
        this.router.navigate(['admin/news']);
      });
    }
  }

  onCloseClick(){
    this.router.navigate(['admin/news']);
    window.scroll(0, 0);
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
