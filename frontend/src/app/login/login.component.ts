import { Component, OnInit} from '@angular/core';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  userModel= new User('','');

  constructor(private _enrollement:EnrollmentService) { }
  loggedIn="false";
  
  ngOnInit(): void {
  }
  
  onSubmit(){
    console.log(this.userModel);
    this._enrollement.enroll(this.userModel)
    .subscribe(
      data => console.log("success",data),
      error => console.log('error',error)
    )
  }
  
   
}
