import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

import { map } from 'rxjs/operators';
import { Nota } from '../interfaces/nota.interface';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class NotasService {

  public itemsCollection!: AngularFirestoreCollection<Nota>;
  public notas: Nota[] = [];
  // public usuario: any = {};

  constructor( private afs: AngularFirestore,
               private auth: AngularFireAuth,
               private authService: AuthService ) {
  }

  cargar() {

    this.itemsCollection = this.afs.collection<Nota>('notas', ref => ref.orderBy('fecha', 'desc'));
    // se mantiene pendiente a todos los cambios
    return this.itemsCollection.valueChanges({idField: 'id'})
      .pipe(
        map( (notas: Nota[]) => {
          this.notas = notas.filter((nota) => nota.uid == this.authService.user);
          return this.notas;

          // this.notas = notas;
          // this.notas = [];

          // for (let mensaje of notas) {
          //   this.notas.unshift(mensaje);
          // }
          // return this.notas;
        })
      )
  }

  agregar( titulo: string = '', cuerpo: string ) {

    let nota: Nota = {
      titulo,
      cuerpo,
      uid: this.authService.user,
      fecha: new Date().getTime()
    }

    return this.itemsCollection.add( nota );

  }

  actualizar( nota: Nota ) {
    this.itemsCollection.doc(nota.id).update({titulo: nota.titulo, cuerpo: nota.cuerpo})
  }

  eliminar( nota: Nota ) {
    return this.itemsCollection.doc(nota.id).delete();  
  }

}
