import { useCallback, useContext } from 'react';
import styles from '../../styles/Othello.module.css';
import { Disk } from './Disk';
import { BoardCtx, CellContent, X } from './Othello';

type CellProps = {
   i: number
   j: number
   content: CellContent
};

export function Cell(props: CellProps) {
   const {i,j} = props
   const board = useContext(BoardCtx);
   const addHandler = useCallback(
      (event: any): void => {
            if (!board) {
               return
            }
            board.addPeice(i,j)
      },
      [
         board,
         i,j
      ]
   )

   const callback = props.content == X ? addHandler : undefined;
   return (
      <td className={styles.cell} onClick={callback}><Disk content={props.content} /></td>
   )
}
