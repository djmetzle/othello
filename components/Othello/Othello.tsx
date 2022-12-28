import styles from '../../styles/Othello.module.css'
import { BoardUI } from './Board';


export type X = ""
export type B = "B"
export type W = "W"

export const X: X = ""
export const B = "B"
export const W = "W"

export type CellContent = X | B | W

export type Row = CellContent[]
export type Board = Row[]

const BOARD_SIZE = 8
//const BOARD_SIZE = 4

const indexList = (n: number): number[] => Array.from(Array(n).keys())

function emptyBoard(): Board {
   const emptyBoard: Board = [] 
   for (const row in indexList(BOARD_SIZE)) {
      emptyBoard[row] = []
      for (const column in indexList(BOARD_SIZE)) {
         emptyBoard[row][column] = X
      }
   }
   return emptyBoard
}

function startingBoard(): Board {
   const starting = emptyBoard()
   const half = BOARD_SIZE / 2
   const l = half - 1, t = half - 1
   const r = half, b = half
   starting[l][t] = B
   starting[r][t] = W
   starting[l][b] = W
   starting[r][b] = B
   return starting
}

function Othello(props: any) {
   console.log(emptyBoard())
   const board = startingBoard()
   return (
      <div className={styles.game}>
         <BoardUI board={board}/>
      </div>
   )
}

export default Othello