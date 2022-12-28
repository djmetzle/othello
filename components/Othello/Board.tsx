import styles from '../../styles/Othello.module.css';
import { Cell } from "./CellProps";

import {X,B,W, Board, Row} from './Othello'

type BoardUIProps = {
   board: Board
};

type RowUIProps = {
   i: number
   row: Row
}

function RowUI(props: RowUIProps) {
   const {row, i} = props
   const cells = row.map((cell,j)=> {
         return (
            <Cell key={`cell${i}${j}`} content={cell} />
         )
      }
   )
   console.log(cells)
   return (
      <tr>
         {cells}
      </tr>
   )
}

export function BoardUI(props: BoardUIProps) {
   const board = props.board
   return (
      <div className={styles.gameboard}>
         <table>
            <tbody>
               {board.map((row, i)=> <RowUI i={i} key={`row${i}`} row={row}/>)}
            </tbody>
         </table>
      </div>
   );
}
