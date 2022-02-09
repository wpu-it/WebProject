import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UsersService} from "../../../user/dashboard/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'update-fantour-photo',
  templateUrl: 'update-fantour-photo.component.html',
  styleUrls: ['update-fantour-photo.component.scss']
})
export class UpdateFantourPhotoComponent implements OnInit{
  form: FormGroup;
  disabled = false;
  tourId: number;
  isConfirmed = true;
  errors: HttpErrorResponse[] = [];

  constructor(
    private readonly fantoursService: FantoursService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ){
    this.form = new FormGroup({
      'photo': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.tourId = Number(params.id);
    })
  }

  onEditClick(){
    if(this.form.valid){
      const { photo } = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.fantoursService.updateFantourPhoto(photo, this.tourId).pipe(
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
        this.router.navigate(['admin/fantours']);
      });
    }
  }

  onCloseClick(){
    this.router.navigate(['admin/fantours']);
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
