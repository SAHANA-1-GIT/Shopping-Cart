import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { NewUser } from '../new-user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userModel= new NewUser('','','');

  constructor(private _enrollement:EnrollmentService) { }
  loggedIn="false";
  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.userModel);
    this._enrollement.enrollNewUser(this.userModel)
    .subscribe(
      data => console.log("success",data),  
      error => console.log('error',error)
    )
  }

}
