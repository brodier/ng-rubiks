import { Injectable } from '@angular/core';
import { Piece } from './_model/piece.model';
@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }


  // Load full board position
  getBoard() {
    var lists = [];
    for(let j= 0; j < 7; j++) {
      var rowLine = [];
      for(let i = 0; i < 20; i++) {
        rowLine.push({value: 0, color: 'none'});
      }
      lists.push({id: 'pl-' + j, pieces: rowLine});
    }
    return lists;
  }

  // observe change on board as sequential step from a define step
  observeBoard(step:number) {

  }

  draw() {

  }

  validate() {

  }

  reset() {

  }
}
