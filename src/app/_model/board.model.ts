export interface Board {
    table: number[];
    rule: number[];
    step: number;
}

export interface Move {
  from?: string;
  fromIndex?: number;
  piece?: number;
  to: string;
  toIndex: number;
}
