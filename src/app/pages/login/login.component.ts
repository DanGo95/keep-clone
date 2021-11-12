import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit(): void {

    if (this.auth.user !== '') {
      this.router.navigateByUrl('/home');
    }
    
    if( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email') || '';
      this.recordarme = true;
    }

  }


  login( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })

    Swal.showLoading();

    this.auth.login(this.usuario)
      .then(() => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/home');
      })
      .catch( () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          text: 'Usuario y/o contraseña inválido'
        })
      })
  }


}
