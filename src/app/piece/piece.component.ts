import { Component, OnInit, Input } from '@angular/core';

import { Piece } from '../_model/piece.model';

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {

  @Input() piece?: Piece;

  constructor() { }

  ngOnInit(): void {
  }

}
