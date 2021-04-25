import { Component, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDropList, CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Piece } from '../_model/piece.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  lists = [
    {id: 'pl-1', pieces: [{color: 'red', value: 1}, {color: 'red', value: 2}, {color: 'red', value: 3}]},
    {id: 'pl-2', pieces: [{color: 'blue', value: 4}, {color: 'blue', value: 5}, {color: 'blue', value: 6}]},
    {id: 'pl-3', pieces: [{color: 'yellow', value: 4}, {color: 'yellow', value: 5}, {color: 'yellow', value: 6}]},
    {id: 'pl-4', pieces:[{color: 'black', value: 4}, {color: 'black', value: 5}, {color: 'black', value: 6}]}
  ]
  allLists = ['pl-1','pl-2','pl-3','pl-4'];

  all = [
    {color: 'red', value: 1},
    {color: 'red', value: 2},
    {color: 'red', value: 3},
    {color: 'none', value: 0},
    {color: 'red', value: 5},
    {color: 'red', value: 6},
    {color: 'red', value: 7},
    {color: 'red', value: 8},
    {color: 'red', value: 9}];
  even = [{color: 'red', value: 10}];

  drop(event: CdkDragDrop<Piece[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  movePiece(event: CdkDragDrop<Piece[]>) {
    if (event.previousContainer === event.container) {
      return;
    }
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    
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
}
