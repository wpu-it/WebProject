import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.scss']
})
export class AdminComponent{
  constructor(
    private readonly router: Router
  ) {
    this.router.navigate(['admin/fantours']);
  }

  onActivate(event: any){
    window.scroll(window.innerWidth,window.innerHeight);
  }

  onChange(event: any){
    let path = event.tab.textLabel.toLowerCase();
    if(path == "orders diagram"){
      path = "orders-diagram";
    }
    else{
      let arr = path.split(' ');
      path = '';
      for(let i =0; i< arr.length;i++) path += arr[i];
    }
    this.router.navigate(['admin/' + path]);
  }
}
