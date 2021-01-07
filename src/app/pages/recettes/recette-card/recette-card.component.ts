import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecetteDetailComponent } from '../recette-detail/recette-detail.component';
import { Recette } from '../../../domain/model/recette.model';


@Component({
  selector: 'ngx-recette-card',
  styleUrls: ['./recette-card.component.scss'],
  templateUrl: './recette-card.component.html',
})
export class RecetteCardComponent implements OnInit {

  @Input() recette: Recette;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  showLargeModal() {
    const activeModal = this.modalService.open(RecetteDetailComponent, { size: 'lg', container: 'nb-layout'});

    activeModal.componentInstance.modalHeader = 'Large Modal';
    activeModal.componentInstance.recette = this.recette;
  }
}
