import { Component, OnInit, ViewChild, Input} from '@angular/core';
import {NgForm} from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDropList, CdkDragDrop, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem} from '@angular/cdk/drag-drop';
import { Board, Move } from '../_model/board.model';
import { BoardService } from '../board.service';

const COLOR_LIST = ['red','blue','yellow','black'];


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor(public bdSvc: BoardService) {
    this.lists = bdSvc.getBoard();
  }

  ngOnInit(): void {
  }

  @ViewChild('myrule') myrule!: CdkDropList;

  emptyPiece = -1;
  newPiece = 32; // 7 blue
  lists = [{id: 'pl-0', pieces: [-1]}];
  allLists = ['pl-0', 'pl-1','pl-2','pl-3','pl-4', 'pl-5','pl-6'];
  myList: number[] = this.initMyList();
  addList = [-1];

  movePiece(event: CdkDragDrop<number[]>) {
    console.info("from: " + event.previousContainer.id + " at " + event.previousIndex);
    console.info("to: " + event.container.id + " at " + event.currentIndex);
    var currentPiece = this.myList[event.previousIndex];
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    var move = {from: "pl-0", fromIndex: 0, piece: -1, to: "pl-0", toIndex: 0};
    if(event.previousContainer.id=='rule') {
      console.info("player play : " + currentPiece);
      move.piece = currentPiece;
    } else {
      move.from = event.previousContainer.id;
      move.fromIndex = event.previousIndex;
    }
    move.to = event.container.id;
    move.toIndex = event.currentIndex;
    this.bdSvc.sendMove(move);
    // todo organize line to avoid long line
  }

  initMyList() {
    let rulePieces = new Array();
    for(let i:number = 0; i < 14; i++) {
        rulePieces.push(this.randomPiece());
    }
    return rulePieces;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  checkMovePiece(drag: CdkDrag<number>, dropList: CdkDropList) {
    return true;
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }

  getConnectedList() {
    return this.allLists;
  }

  isEmptyPiece(p: number) {
    return p==-1;
  }

  add() {
    console.info(this.myrule);
    // this.myrule.addItem(new CdkDrag({color: 'red', value: 10});
    this.myList.push(this.randomPiece() );
  }

  randomPiece() {
    return Math.floor(Math.random() * 106);
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
    this.myList = this.myList.sort();
  }

  sortMyList2() {
    var colorInd='none';
    var currValue=0;
    var count=0;
    this.myList = this.myList.sort(function(p1,p2) {
      if(p1 > 103 && p2 < 104) {
        return -1
      }
      if(p1 < 104 && p2 > 103) {
        return 1;
      }
      if(p1 > 103 && p2 > 103) {
        if(p1 < p2) {
            return -1;
        } else {
          return 1;
        }
      }
      if(Math.floor(p1/26) == Math.floor(p2/26)) {
        if (p1 % 13 == p2 % 13) {
          return 0;
        } else if(p1 % 13 < p2 % 13) {
          return -1;
        } else {
          return 1;
        }
      } else if (Math.floor(p1/26) < Math.floor(p2/26)) {
        return -1;
      } else {
        return 1;
      }
    });
  }


}
