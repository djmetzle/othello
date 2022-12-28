import {createContext, useState} from "react";
import styles from '../../styles/Othello.module.css'
import { BoardUI } from './BoardUI';

export type X = ""
export type B = "B"
export type W = "W"

export const X: X = ""
export const B = "B"
export const W = "W"

export type CellContent = X | B | W

export type Row = CellContent[]

type Move = {i:number,j:number}

class Rules {
   valoidate(board: Board, i: number, j: number): boolean {
      const adjancentOpposite: boolean = i == 0
      //sillyness
      if ((i%2 == 0) && (j%2 == 0)) { return true }


      return false
   }
}

export class Board {
   private history: Move[]
   rows: Row[]
   rules: Rules
   constructor(rows: Row[], history: Move[]) {
      this.history = history
      this.rows = rows
      this.rules = new Rules()
   }
   public addPiece(i: number, j: number): Board|undefined {
      if (!this.validatePos(i,j)){
         return
      }
      console.log(`new peice ${i},${j}`)
      this.history.push({i,j})
      this.rows[i][j] = this.turn()
      return new Board(this.rows, this.history)
   }
   public reset(): void {
      this.history = []
   }
   private turn(): B|W {
      return this.history.length % 2 ? B : W
   }
   private validatePos(i: number, j:number): boolean {
      return this.rules.validate(this,i,j)
   }
}

function newBoard(): Board {
   const emptyBoard = new Board([],[])
   for (const row in indexList(BOARD_SIZE)) {
      const emptyRow: Row = []
      emptyBoard.rows[row] = emptyRow
      for (const column in indexList(BOARD_SIZE)) {
         emptyBoard.rows[row][column] = X
      }
   }
   const starting = emptyBoard
   const half = BOARD_SIZE / 2
   const l = half - 1, t = half - 1
   const r = half, b = half
   starting.rows[l][t] = B
   starting.rows[r][t] = W
   starting.rows[l][b] = W
   starting.rows[r][b] = B
   return starting
}

const BOARD_SIZE = 8
//const BOARD_SIZE = 4

const indexList = (n: number): number[] => Array.from(Array(n).keys())

interface BoardUICommands {
   addPeice: (i:number, j:number) => void;
   reset: () => void;
}

export const BoardCtx = createContext<BoardUICommands | null>(null);

function Othello(props: any) {
   const [board, setBoard] = useState(newBoard());
   const boardCommands: BoardUICommands = {
      addPeice: (i,j) => {
         const nextBoard = board.addPiece(i,j)
         if (nextBoard) {
         setBoard(nextBoard)
         }
      },
      reset: () => {
         setBoard(newBoard())
      },
   }
   return (
      <div className={styles.game}>
         <BoardCtx.Provider value = {boardCommands}>
            <BoardUI board={board}/>
         </BoardCtx.Provider>
      </div>
   )
}

export default Othello