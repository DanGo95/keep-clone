import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public user!:string;

  userToken: string = '';

  constructor( public auth: AngularFireAuth ) {

    this.auth.authState.subscribe( user=> {
    
      if ( !user ) {
        return;
      }
      
      this.user = user.uid;
      
    })

  }

  get authenticated(): boolean {
    if (this.user !== '') {
      return true;
    }
    return false;
  }

  logout(){
    this.user = '';
    this.auth.signOut();
   }

  registro( usuario: UsuarioModel ) {
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.password);
  }

  login( usuario: UsuarioModel ) { 
    return this.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
  }

}
