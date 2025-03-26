import { useTypedSelector } from "./useTypedSelector";

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const showFunc = /*js*/ `
        import _React from "react";
        import { createRoot as _createRoot } from "react-dom/client";
    
        var show = (value) => {
          const root = document.querySelector("#root");
    
          if (typeof value === "object") {
            if (value.$$typeof && value.props) {
              _createRoot(root).render(value);
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        }
        `;

    const showFuncNoOperations = /*js*/ `var show = () => {};`;

    const cumulativeCellsCode = [];
    for (const orderedCell of orderedCells) {
      if (orderedCell.type === "code") {
        if (orderedCell.id === cellId) {
          cumulativeCellsCode.push(showFunc);
        } else {
          cumulativeCellsCode.push(showFuncNoOperations);
        }
        cumulativeCellsCode.push(orderedCell.content);
      }

      if (orderedCell.id === cellId) {
        break;
      }
    }

    return cumulativeCellsCode;
  }).join("\n");
};
