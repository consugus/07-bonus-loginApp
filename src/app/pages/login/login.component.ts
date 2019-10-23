import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserModel;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.user =new UserModel();
  }

  login(form:NgForm){

    if(form.invalid){ return; }

    // console.log('Imprimir si el formulario es válido');
    // console.log(form);

    this.auth.login(this.user).subscribe( res => {
      console.log(res);

    }, err => {
      let message = err.error.error.message.toLowerCase().split('_').join(' ');
      console.log(message);

    }
    );

  }

}
