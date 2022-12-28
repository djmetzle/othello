import { Board, BOARD_SIZE, CellContent, indexList, Move, X } from "./Othello";

type AttackLine = {
   connected: boolean
   adjacent: boolean
   positions: Move[]
}

export class Rules {
   private board: Board;
   constructor(board: Board) {
      this.board = board;
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

   public validate(move: Move): boolean {
      return this.adjacent(move) && this.inLine(move)
   }

   public applyMove(board: Board, move: Move): void {
      if (!this.validate(move)) {
         return
      }
      const opponents = this.opponents(move)
      opponents.forEach((opponent)=> {
         board.rows[opponent.i][opponent.j] = board.turn()
      })
      board.rows[move.i][move.j] = board.turn()
   }

   private findFlips(board:Board,move:Move): Move[] {
      // wat
      return []
   }

   private pencil(move: Move, offset: number): Move[] {
      const {i,j} = move
      return (
         [
            {i: i - offset, j: j - offset},
            {i: i, j: j - offset},
            {i: i + offset, j: j - offset},
            {i: i - offset, j},
            //not the center === [i,j],
            {i: i + offset, j: j},
            {i: i - offset, j: j + offset},
            {i: i, j: j + offset},
            {i: i + offset, j: j + offset},
         ]
      )
   }

   private adjacent(move: Move): boolean {
      const neighbors = this.pencil(move,1).map((movePos) => {
         const row = this.board.rows[movePos.i];
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
         return opponent != this.board.turn();
      });
      if (opponents.length > 0) {
         return true;
      }
      return false;
   }

   private inLine(move: Move): boolean {
      return this.opponents(move).length > 0
   }
   private isOpponent(move: Move|undefined): boolean {
      if (move == undefined) { return false }
      const cellContents = this.board.cell(move);
      if (cellContents == undefined) { return false }
      return cellContents != X && cellContents != this.board.turn()
   }

   private opponents(move: Move): Move[] {
      const offsets = indexList(BOARD_SIZE)
      const offsetPencils = offsets.map((offset:number) => {
         return this.pencil(move, offset)
      })

      const lines: Move[][] =  []
      // transpose
      offsetPencils.forEach((pencil, offset) => {
         pencil.forEach((position,line)=>{
            if (lines[line] == undefined) {
               lines[line] = []
            }
            lines[line][offset] = position

         })
      })

      const opponents: Move[] = []
      lines.forEach((line)=> {
         let connected: Boolean = true
         let bounded: Boolean = false
         const foundOpponents: Move[] = []
         line.forEach((position,i)=> {
            if (i > 0 && connected && !bounded) {
               if (this.board.cell(position) == X || this.board.cell(position) == undefined) {
                  connected = false
               }
               if (this.isOpponent(position) && connected && !bounded) {
                  foundOpponents.push(position)
               } else {
                  if (this.board.cell(position) == this.board.turn()) {
                     connected = false
                     bounded = true
                  }
               }
            }
         })
         if (bounded) {
            foundOpponents.forEach((opponent)=> opponents.push(opponent))
         }
      })
      return opponents
   }
}
