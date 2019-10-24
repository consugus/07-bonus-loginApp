import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:UserModel;
  rememberUser:boolean = false;

  constructor( private auth:AuthService,
               private router:Router) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit( form:NgForm ){

    if(!form.valid){ return; }

    // console.log('Formulario enviado');
    // console.log(this.user);
    // console.log(form);

    Swal.fire({
      allowOutsideClick: false,
      type: "info",
      text: "Espere por favor..."
    });
    Swal.showLoading();

    this.auth.newUser( this.user )
      .subscribe( res => {
        console.log(res);
        Swal.close();

        if(this.rememberUser) {
          localStorage.setItem('email', this.user.email);
        } else{
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/home');
      }, (err) =>{
        let message = err.error.error.message.toLowerCase().split('_').join(' ');
        console.log('Error: ', message);
        Swal.fire({
          type: "error",
          title: 'Error al registrar nuevo usuario',
          text: message
        });
      })


  }


}
