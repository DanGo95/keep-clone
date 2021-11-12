import { Component, Input, OnInit } from '@angular/core';
import { Nota } from '../../interfaces/nota.interface';
import { NotasService } from '../../services/notas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {
  @Input() notas: Nota[] = [];
  
  constructor( private notasService: NotasService, private modalService: NgbModal ) { }
  
  ngOnInit(): void {
  }

  eliminar( nota: Nota ) {
    this.notasService.eliminar(nota)
  }

  abrirModal( nota: Nota ) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.nota = nota;

    modalRef.closed.subscribe( (nota: Nota) => {
      this.notasService.actualizar(nota)
    })

    // modalRef.result.then((result: Nota) => {
    //   if (result) {
    //     this.notasService.actualizar(result)
    //     }
    //   }
    // )
  }


}
