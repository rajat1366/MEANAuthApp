import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ValidateService} from '../../services/validate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(private _authService:AuthService,
              private _flashMessagesService:FlashMessagesService,
              private router:Router,
              private _validateService:ValidateService
              ){}

  ngOnInit() {
  }
  onLoginSubmit(){
    var user = {
      username: this.username,
      password: this.password
    };
    if(!this._validateService.validateLogin(user)){
      this._flashMessagesService.show("Please fill in all fields",{cssClass:'alert-danger',timeout: 5000});
       
       return false;
    } 
    this._authService.authenticateUser(user).subscribe(data =>{
        if(data.success){
            this._authService.storeUserData(data.token,data.user);
            this._flashMessagesService.show("You are now logged In",{cssClass:'alert-success',timeout: 5000});
          this.router.navigate(['/dashboard']);
        } else {
          this._flashMessagesService.show(data.message,{cssClass:'alert-danger',timeout: 5000});
          this.router.navigate(['/login']);
         }
    });
  }
}
