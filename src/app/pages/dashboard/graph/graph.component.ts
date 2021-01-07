import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ngx-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() num: number;

  constructor() { }

  ngOnInit() {
  }

}
