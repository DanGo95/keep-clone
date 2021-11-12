import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotasService } from '../../services/notas.service';
import { AuthService } from '../../services/auth.service';
import { Nota } from '../../interfaces/nota.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  public mostrar = false;
  public notas: Nota[] = [];

  @HostListener('document:click', ['$event']) onDocumentClick() {
    this.mostrar = false;
  }


  constructor( private auth: AuthService, private notasService: NotasService, private router: Router ) {
  }

  ngOnInit(): void {
    this.notasService.cargar().subscribe( notas => {
      this.notas = notas;
    });
  }

  salir() {

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

  guardar(titulo: string, cuerpo: string) {
    this.notasService.agregar(titulo, cuerpo);
  }

}
