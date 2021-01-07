import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Stat } from '../../../domain/model/stat.model';

@Component({
  selector: 'ngx-stat',
  styleUrls: ['./stat.component.scss'],
  templateUrl: './stat.component.html',
})
export class StatComponent implements OnInit {

  @Input() stat: Stat;
  @Output() numGraph = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  clickDash() {
    this.numGraph.emit(this.stat.graph);
  }
}
