import styles from '../../styles/Othello.module.css';
import { Disk } from './Disk';
import { CellContent } from './Othello';

type CellProps = {
   content: CellContent;
};

export function Cell(props: CellProps) {
   return (
      <td className={styles.cell}><Disk content={props.content} /></td>
   );
}
