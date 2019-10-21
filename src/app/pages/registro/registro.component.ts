import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  user:UserModel;

  constructor() { }

  ngOnInit() {
    this.user = new UserModel();
  }

  onSubmit( form:NgForm ){

    if(!form.valid){ return; }

    console.log('Formulario enviado');
    console.log(this.user);
    console.log(form);


  }


}
