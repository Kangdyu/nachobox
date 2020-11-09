import { useRef, useReducer, useEffect, useState } from "react";

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

type useScrollGridProps = {
  gridInfo: {
    columnWidth: number;
    gap: number;
    listLength: number;
  };
  scrollRatio: number;
};

function useScrollGrid({
  scrollRatio,
  gridInfo: { columnWidth, gap, listLength },
}: useScrollGridProps) {
  const [scroll, dispatch] = useReducer(reducer, INITIAL_STATE);
  const gridRef = useRef() as React.RefObject<HTMLDivElement>;
  const [containerWidth, setContainerWidth] = useState(0);
  const [maxScrollLimit, setMaxScrollLimit] = useState(0);

  const scrollAmount = (columnWidth + gap) * scrollRatio;

  useEffect(() => {
    const handleResize = () => {
      if (gridRef.current) {
        setContainerWidth(
          gridRef.current?.getBoundingClientRect().width as number
        );
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [gridRef]);

  useEffect(() => {
    setMaxScrollLimit(
      -(listLength * (columnWidth + gap) - gap - containerWidth)
    );
  }, [listLength, columnWidth, gap, containerWidth]);

  useEffect(() => {
    if (maxScrollLimit >= 0) {
      dispatch(setIsRightEnd(true));
    } else {
      dispatch(setIsRightEnd(false));
    }
  }, [maxScrollLimit]);

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
