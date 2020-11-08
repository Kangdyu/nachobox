import { useLocation } from "react-router-dom";

function useQuery(name: string) {
  const queryString = useLocation().search;
  const query = new URLSearchParams(queryString);

  return query.get(name);
}

export default useQuery;
