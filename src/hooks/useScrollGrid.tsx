import { useRef, useReducer } from "react";

interface Scroll {
  amount: number;
  isLeftEnd: boolean;
  isRightEnd: boolean;
}

type Action =
  | {
      type: "moveScroll";
      payload: { amount: number; isLeftEnd?: boolean; isRightEnd?: boolean };
    }
  | { type: "setIsLeftEnd"; payload: boolean }
  | { type: "setIsRightEnd"; payload: boolean };

function moveScroll({
  amount,
  isLeftEnd,
  isRightEnd,
}: {
  amount: number;
  isLeftEnd?: boolean;
  isRightEnd?: boolean;
}): Action {
  return { type: "moveScroll", payload: { amount, isLeftEnd, isRightEnd } };
}

function setIsLeftEnd(payload: boolean): Action {
  return { type: "setIsLeftEnd", payload };
}

function setIsRightEnd(payload: boolean): Action {
  return { type: "setIsRightEnd", payload };
}

const INITIAL_STATE: Scroll = {
  amount: 0,
  isLeftEnd: true,
  isRightEnd: false,
};

function reducer(state: Scroll, action: Action): Scroll {
  switch (action.type) {
    case "moveScroll":
      const newState = {
        ...state,
        amount: action.payload.amount,
      };
      if (action.payload.isLeftEnd) {
        newState.isLeftEnd = true;
      } else if (action.payload.isRightEnd) {
        newState.isRightEnd = true;
      }
      return newState;
    case "setIsLeftEnd":
      return { ...state, isLeftEnd: action.payload };
    case "setIsRightEnd":
      return { ...state, isRightEnd: action.payload };
    default:
      throw new Error("Unknown Action: useScrollGrid");
  }
}

interface props {
  gridInfo: {
    gridWidth: number;
    gridGap: number;
    gridListLength: number;
  };
  scrollRatio: number;
}

function useScrollGrid({
  scrollRatio,
  gridInfo: { gridWidth, gridGap, gridListLength },
}: props) {
  const [scroll, dispatch] = useReducer(reducer, INITIAL_STATE);
  const gridRef = useRef() as React.RefObject<HTMLDivElement>;

  const scrollAmount = (gridWidth + gridGap) * scrollRatio;
  const containerWidth = gridRef.current?.getBoundingClientRect()
    .width as number;
  const maxScrollLimit = -(
    gridListLength * (gridWidth + gridGap) -
    containerWidth
  );

  const onScrollLeft = () => {
    // +
    const moved = scroll.amount + scrollAmount;
    if (moved >= 0) {
      dispatch(moveScroll({ amount: 0, isLeftEnd: true }));
    } else {
      dispatch(moveScroll({ amount: moved }));
    }

    if (scroll.isRightEnd) {
      dispatch(setIsRightEnd(false));
    }
  };

  const onScrollRight = () => {
    // -
    const moved = scroll.amount - scrollAmount;
    if (moved <= maxScrollLimit) {
      dispatch(moveScroll({ amount: maxScrollLimit, isRightEnd: true }));
    } else {
      dispatch(moveScroll({ amount: moved }));
    }

    if (scroll.isLeftEnd) {
      dispatch(setIsLeftEnd(false));
    }
  };

  return { scroll, gridRef, onScrollLeft, onScrollRight };
}

export default useScrollGrid;
