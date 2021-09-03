import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';

const Navbar = () => {
  const { isLoading, error, data } = useCountriesNames('uniteddd');

  if (isLoading) return 'Loading...';

  if (error) {
    if (error.message === errorCodes.NOT_FOUND)
      return 'countries not found - modify the search field';
    return 'api server error';
  }

  return <div>{data[0].name}</div>;
};

export default Navbar;
