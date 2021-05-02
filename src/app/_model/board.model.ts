import { Piece } from './piece.model';

export interface Board {
    table: Piece[];
    rule: Piece[];
    step: number;
}

export interface Move {
  from?: string;
  fromIndex?: number;
  piece?: Piece;
  to: string;
  toIndex: number;
}
