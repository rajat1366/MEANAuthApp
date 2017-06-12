import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service'
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
  
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;
 
  constructor(private _validateService:ValidateService,
              private _flashMessagesService :FlashMessagesService,
              private _authService: AuthService,
              private router:Router) { 
   }

  ngOnInit() {
  }
  onRegisterSubmit(){
    var user = {
      name:this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }

    //Required Fields
    if(!this._validateService.validateRegister(user)){
      this._flashMessagesService.show("Please fill in all fields",{cssClass:'alert-danger',timeout: 10000});
       return false;
    }

    //Validate Email
    if(!this._validateService.validateEmail(user.email)){
      this._flashMessagesService.show("Invalid Email",{cssClass:'alert-danger'});
       return false;
    }
    //Register user
    this._authService.registerUser(user).subscribe(data => {
        console.log(data);
        if(data.success){
            this._flashMessagesService.show("You are now Registered and log in ",{cssClass:'alert-success',timeout: 10000});
            this.router.navigate(['/login']);
        } else {
            this._flashMessagesService.show(data.message,{cssClass:'alert-danger',timeout: 10000});
            this.router.navigate(['/register']);
        }
    });

  }

}
