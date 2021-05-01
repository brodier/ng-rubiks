import { Component, OnInit, ViewChild } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDropList, CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { Piece } from '../_model/piece.model';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @ViewChild('myrule') myrule!: CdkDropList;

  emptyPiece = {color: 'none', value: 0};
  newPiece = {color: 'blue', value: 7};
  lists = [
    {id: 'pl-1', pieces: [{color: 'red', value: 1}, {color: 'red', value: 2}, {color: 'red', value: 3}, {color: 'none', value: 0},
    this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece]},
    {id: 'pl-2', pieces: [{color: 'blue', value: 4}, {color: 'blue', value: 5}, {color: 'blue', value: 6}, this.emptyPiece,
    this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, ]},
    {id: 'pl-3', pieces: [{color: 'yellow', value: 4}, {color: 'yellow', value: 5}, {color: 'yellow', value: 6}, this.emptyPiece,
  this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece]},
    {id: 'pl-4', pieces:[{color: 'black', value: 4}, {color: 'black', value: 5}, {color: 'black', value: 6},this.emptyPiece,
  this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece, this.emptyPiece]}
  ]
  allLists = ['pl-1','pl-2','pl-3','pl-4'];
  myList = [{color: 'red', value: 10}];
  addList = [{color: 'none', value: 0}];
  movePiece(event: CdkDragDrop<Piece[]>) {
    console.info("from: " + event.previousContainer.id + " at " + event.previousIndex);
    console.info("to: " + event.container.id + " at " + event.currentIndex); 

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

  }
  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<Piece>) {
    return item.data.value % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  checkMovePiece(drag: CdkDrag<Piece>, dropList: CdkDropList) {
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  getConnectedList() {
    return this.allLists;
  }

  isEmptyPiece(p: Piece) {
    return p.value==0;
  }

  add() {
    console.info(this.myrule);
    // this.myrule.addItem(new CdkDrag({color: 'red', value: 10});
    this.myList.push(this.newPiece );
  }

  testRemoteMove() {
    moveItemInArray(this.lists[0].pieces, 0, 2);
  }
}
