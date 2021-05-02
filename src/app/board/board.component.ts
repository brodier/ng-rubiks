import { Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
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

  constructor(bdSvc: BoardService) {
    this.lists = bdSvc.getBoard();
  }

  ngOnInit(): void {
  }

  @ViewChild('myrule') myrule!: CdkDropList;

  emptyPiece = {color: 'none', value: 0};
  newPiece = {color: 'blue', value: 7};
  lists = [{id: 'pl-0', pieces: [{color: 'none', value: 0}]}];

  colors = ['red','blue','yellow','black'];

  allLists = ['pl-0', 'pl-1','pl-2','pl-3','pl-4', 'pl-5','pl-6'];
  myList: Piece[] = this.initMyList();
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
    // todo organize line to avoid long line
  }

  initMyList() {
    let rulePieces = new Array();
    for(let i:number = 0; i < 14; i++) {
        rulePieces.push(this.randomPiece());
    }
    return rulePieces;
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
    this.myList.push(this.randomPiece() );
  }

  randomPiece() {
    return {color: this.colors[Math.floor(Math.random() * 4)], value: 1 + Math.floor(Math.random() * 13) };
  }

  testRemoteMove(mfl:string, mtl:string, mfi:string, mti:string) {
    console.info("move_from_list obj:" + mfl);
    let fromList = this.lists[this.allLists.indexOf(mfl)].pieces;
    let toList = this.lists[this.allLists.indexOf(mtl)].pieces;
    let fromIndex = parseInt(mfi);
    let toIndex = parseInt(mti);
    if (fromList === toList) {
      moveItemInArray(fromList, fromIndex, toIndex);
    } else {
      transferArrayItem(fromList, toList, fromIndex, toIndex);
    }
  }

  sortMyList() {
    this.myList = this.myList.sort(function(p1,p2) {
      const colors = ['red','blue','yellow','black'];

      if(p1.value < p2.value) {
        return -1;
      }
      if(p1.value > p2.value) {
        return 1;
      }
      if(colors.indexOf(p1.color) < colors.indexOf(p2.color)) {
        return -1;
      }
      if(colors.indexOf(p1.color) > colors.indexOf(p2.color)) {
        return 1;
      }
      return 0;
    });
  }
}
