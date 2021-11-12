import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Nota } from '../../interfaces/nota.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() nota!: Nota; 

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit(): void {
  }

  passBack() {
    this.activeModal.close(this.nota);
  }

}
