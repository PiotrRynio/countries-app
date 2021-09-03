import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';

export const useSearchParams = () => {
  const location = useLocation();
  const history = useHistory();
  const parsedSearch = queryString.parse(location.search);

  const values = {
    page: String(parsedSearch.page ?? '1'),
    search: String(parsedSearch.search ?? ''),
  };

  const setSearchParams = (newValues) => {
    const parsedNewValues = queryString.stringify(
      { ...values, ...newValues },
      { skipEmptyString: true },
    );
    history.replace(location.pathname + '?' + parsedNewValues);
  };

  return { ...values, setSearchParams };
};
