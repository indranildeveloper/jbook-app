import { FC, Fragment, useEffect } from "react";
import { useTypedSelector } from "../../hooks";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";
import { useActions } from "../../hooks";

const CellList: FC = () => {
  const { fetchCells, saveCells } = useActions();

  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id]),
  );

  useEffect(() => {
    fetchCells();
  }, []);

  useEffect(() => {
    saveCells();
  }, [JSON.stringify(cells)]);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell previousCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
