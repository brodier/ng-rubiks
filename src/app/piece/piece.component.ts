import { Component, OnInit, Input } from '@angular/core';

const COLOR_LIST = ['red','blue','yellow','black'];

@Component({
  selector: 'app-piece',
  templateUrl: './piece.component.html',
  styleUrls: ['./piece.component.css']
})
export class PieceComponent implements OnInit {
  @Input() pieceId: number = -1;

  constructor() {
  }

  ngOnInit(): void {
  }

  getColor() {
    if(this.pieceId == -1) {
      return 'none';
    } else if(this.pieceId==105) {
      return 'black';
    } else if(this.pieceId==104) {
      return 'red';
    } else {
      return  COLOR_LIST[Math.floor(this.pieceId/26)];
    }
  }

  getFace() {
    if(this.pieceId == -1) {
      return 'none';
    } else if(this.pieceId > 103) {
      return 'jocker';
    } else {
      return ((this.pieceId % 13) + 1).toString();
    }
  }

}
