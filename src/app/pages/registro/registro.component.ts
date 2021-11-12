import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { ClickOutsideModule } from 'ng-click-outside';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor( private auth: AuthService, private router: Router ) { 
    this.usuario = new UsuarioModel();
  }

  ngOnInit(): void {
    if (this.auth.user !== '') {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit( form: NgForm ) {

    if ( form.invalid ) { return; }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    })

    Swal.showLoading();

    this.auth.registro( this.usuario )
      .then( () => {
        Swal.close();
        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      })
      .catch( (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrarse',
          text: err
        })
      })


    // this.auth.nuevoUsuario( this.usuario )
    //   .subscribe( resp => { 
    //     Swal.close();
    //     if( this.recordarme ) {
    //       localStorage.setItem('email', this.usuario.email);
    //     }
    //     this.router.navigateByUrl('/home');
    //   }, err => {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error al registrarse',
    //       text: err.error.error.message
    //     })
    //   })

  }

}
