import styles from '../../styles/Othello.module.css'
import { Disk } from './Disk';
import { B, Board, W } from './Othello';

export type HeadingUIProps = {
   board: Board
}

type TurnProps = {
   shouldShow: boolean
   color: B|W
}
function TurnDisplay(props: TurnProps) {
   if (!props.shouldShow) {
      return(<span/>)
   }
   return(
      <div className={styles.turn}>
         <Disk content={props.color}/>
      </div>
   )
}

export function HeadingUI(props: HeadingUIProps) {
   const counts = props.board.counts()
   console.log(counts)
   const b: number = counts[0]
   const w: number = counts[1]
   const showWhiteTurn: boolean = props.board.turn() == W
   const showBlackTurn: boolean = props.board.turn() == B
   return (
      <div className={styles.heading}>
         <span>W: {w}</span>
         <TurnDisplay color={W} shouldShow={showWhiteTurn} />
         <h1>Othello</h1>
         <TurnDisplay color={B} shouldShow={showBlackTurn} />
         <span>B: {b}</span>
      </div>
   );
}
