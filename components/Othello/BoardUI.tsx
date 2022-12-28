import styles from '../../styles/Othello.module.css';

import {X,B,W, Board} from './Othello'
import { RowUI } from './RowUI';

type BoardUIProps = {
   board: Board
};

export function BoardUI(props: BoardUIProps) {
   const board = props.board
   return (
      <div className={styles.gameboard}>
         <table>
            <tbody>
               {board.rows.map((row, i)=> <RowUI i={i} key={`row${i}`} row={row}/>)}
            </tbody>
         </table>
      </div>
   );
}
