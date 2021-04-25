import { Component, OnInit } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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

  /** Predicate function that only allows even numbers to be dropped into a list. */
  evenPredicate(item: CdkDrag<Piece>) {
    return item.data.value % 2 === 0;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
