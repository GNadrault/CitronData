import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Recette } from '../../../domain/model/recette.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-recette-detail',
  templateUrl: './recette-detail.component.html',
  styleUrls: ['./recette-detail.component.scss']
})
export class RecetteDetailComponent implements OnInit {

  @Input() recette: Recette;

  constructor(private activeModal: NgbActiveModal, private sanitazier: DomSanitizer) { }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
  }

  afficherVideo() {
    return this.sanitazier.bypassSecurityTrustResourceUrl(this.recette.video);
  }

}
