import { Cell } from "./Cell";
import { Row } from './Othello';

type RowUIProps = {
   i: number;
   row: Row;
};
export function RowUI(props: RowUIProps) {
   const { row, i } = props;
   const cells = row.map((cell, j) => {
      return (
         <Cell i={i} j={j} key={`cell${i}${j}`} content={cell} />
      );
   }
   );
   return (
      <tr>
         {cells}
      </tr>
   );
}
