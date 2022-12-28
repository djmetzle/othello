import styles from '../../styles/Othello.module.css';
import { CellContent } from './Othello';

type DiskProps = {
   content: CellContent;
};
export function Disk(props: DiskProps) {
   switch (props.content) {
      case "":
         return (<svg className={styles.disk} />
         );
      case "B":
         return (<svg className={styles.disk}>
            <circle cx={'50%'} cy={'50%'} r={'45%'} fill="black" />
         </svg>
         );
      case "W":
         return (<svg className={styles.disk}>
            <circle cx={'50%'} cy={'50%'} r={'45%'} fill="white" />
         </svg>
         );
   }
}
