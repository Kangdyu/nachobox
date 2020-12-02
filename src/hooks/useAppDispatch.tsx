import { AppDispatch } from "modules";
import { useDispatch } from "react-redux";

function useAppDispatch() {
  const dispatch = useDispatch<AppDispatch>();
  return dispatch;
}

export default useAppDispatch;
