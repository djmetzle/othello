import { Edu_VIC_WA_NT_Beginner } from "@next/font/google";
import {createContext, useState} from "react";
import styles from '../../styles/Othello.module.css'
import { BoardUI } from './BoardUI';
import { Rules } from "./Rules";

export type X = ""
export type B = "B"
export type W = "W"

export const X: X = ""
export const B = "B"
export const W = "W"

export type CellContent = X | B | W

export type Row = CellContent[]

type Position = {i:number,j:number}
export type Move = Position

export class Board {
   private history: Move[]
   rows: Row[]
   rules: Rules
   constructor(rows: Row[], history: Move[]) {
      this.history = history
      this.rows = rows
      this.rules = new Rules(this)
   }
   public addPiece(move: Move): Board|undefined {
      if (!this.rules.validate(move)) {
         console.log('move did not validate')
         return
      }
      console.log(`new peice ${move.i},${move.j}`)
      this.rules.applyMove(this, move)
      this.history.push(move)

      return new Board(this.rows, this.history)
   }
   public cell(move: Move): CellContent|undefined {
      const row = this.rows[move.i]
      if (!row) {
         return
      }
      return row[move.j]
   }

   public reset(): void {
      this.history = []
   }
   public turn(): B|W {
      return this.history.length % 2 ? B : W
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

export const BOARD_SIZE = 8
//export const BOARD_SIZE = 4

export const indexList = (n: number): number[] => Array.from(Array(n).keys())

interface BoardUICommands {
   addPeice: (i:number, j:number) => void;
   reset: () => void;
}

export const BoardCtx = createContext<BoardUICommands | null>(null);

function Othello(props: any) {
   const [board, setBoard] = useState(newBoard());
   const boardCommands: BoardUICommands = {
      addPeice: (i,j) => {
         const nextBoard = board.addPiece({i,j})
         if (nextBoard != undefined) {
            setBoard(nextBoard)
         } else {
            setBoard(board)
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