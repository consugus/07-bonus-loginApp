import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:UserModel;
  rememberUser:boolean =  false;

  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.user =new UserModel();
    if(localStorage.getItem('email')){
      this.user.email = localStorage.getItem('email');
      this.rememberUser = true;
    }
  }

  login(form:NgForm){

    if(form.invalid){ return; }

    // console.log('Imprimir si el formulario es válido');

    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();

    this.auth.login(this.user).subscribe( res => {
      console.log(res);
      Swal.close();

      if(this.rememberUser) {
        localStorage.setItem('email', this.user.email);
      } else{
        localStorage.removeItem('email');
      }
      this.router.navigateByUrl('/home');

    }, err => {
      let message = err.error.error.message.toLowerCase().split('_').join(' ');
      console.log(message);
      Swal.fire({
        type: "error",
        title: 'Error al autenticar',
        text: message
      });

    }
    );

  }

}
