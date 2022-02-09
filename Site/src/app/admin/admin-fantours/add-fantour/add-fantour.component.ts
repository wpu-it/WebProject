import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FantoursService} from "../../../user/fantours/fantours.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {catchError, take} from "rxjs/operators";

@Component({
  selector: 'add-fantour',
  templateUrl: 'add-fantour.component.html',
  styleUrls: ['add-fantour.component.scss']
})
export class AddFantourComponent{
  form: FormGroup;
  disabled = false;
  errors: HttpErrorResponse[] = [];
  isConfirmed = true;

  constructor(
    private readonly fantoursService: FantoursService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      'title': new FormControl('', Validators.required),
      'description': new FormControl('', Validators.required),
      'schedule': new FormControl('', Validators.required),
      'priceWithoutTicket': new FormControl('', Validators.required),
      'ticketPrice': new FormControl('', Validators.required),
      'photo': new FormControl(null, Validators.required),
      'quantity': new FormControl('', Validators.required)
    });
    window.scroll(0, 0);
  }

  onAddClick(){
    if(this.form.valid){
      const { title, description, schedule, priceWithoutTicket, ticketPrice, photo, quantity} = this.form.value;
      this.errors = [];
      this.disabled = true;
      this.fantoursService.addFantour(title, description, schedule, priceWithoutTicket, ticketPrice, photo, quantity).pipe(
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
