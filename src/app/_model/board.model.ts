export interface Board {
    table: Piece[];
    rule: Piece[];
    step: number;
}

export interface Move {
  to: number;
}
