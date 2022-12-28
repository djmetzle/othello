import { Board, Move, X } from "./Othello";

export class Rules {
   private board: Board;
   constructor(board: Board) {
      this.board = board;
   }

   public validate(board: Board, move: Move): boolean {
      return this.adjacent(board, move)
   }

   public full(): boolean {
      const rowCounts = this.board.rows;
      console.log(rowCounts)
      return false;
   }

   public won(board: Board): boolean {
      if (!this.full()) {
         return false;
      }
      return true;
   }

   public applyMove(board: Board, move: Move): void {
      const flips = this.findFlips(board,move)
      console.log('apply')
      console.log(flips)
      board.rows[move.i][move.j] = board.turn()
   }

   private findFlips(board:Board,move:Move): Move[] {
      // wat
      return []
   }

   private pencil(move: Move): Move[] {
      const {i,j} = move
      return ( 
         [
            {i: i - 1, j: j - 1},
            {i: i, j: j - 1},
            {i: i + 1, j: j - 1},
            {i: i - 1, j},
            //not the center === [i,j],
            {i: i + 1, j: j},
            {i: i - 1, j: j + 1},
            {i: i, j: j + 1},
            {i: i + 1, j: j + 1},
         ]
      )
   }

   adjacent(board: Board, move: Move): boolean {
      const neighbors = this.pencil(move).map((movePos) => {
         const row = board.rows[movePos.i];
         if (!row) {
            return undefined;
         }
         return row[movePos.j];
      }).filter((neighbor) => {
         if (neighbor == undefined) {
            return
         }
         return neighbor != X;
      });
      const opponents = neighbors.filter((opponent) => {
         return opponent != board.turn();
      });
      if (opponents.length > 0) {
         return true;
      }
      return false;
   }
}