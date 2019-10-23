import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:UserModel;

  constructor( private auth:AuthService ) { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit( form:NgForm ){

    if(!form.valid){ return; }

    // console.log('Formulario enviado');
    // console.log(this.user);
    // console.log(form);

    this.auth.newUser( this.user )
      .subscribe( res => {
        console.log(res);
      }, (err) =>{
        let message = err.error.error.message.toLowerCase().split('_').join(' ');
        console.log('Error: ', message);
      })


  }


}
