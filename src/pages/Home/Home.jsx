import React from 'react';
import { useCountriesNames } from '../../api/apiHooks';

const Navbar = () => {
  const { isLoading, error, data } = useCountriesNames('united');

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return <div>{data[0].name}</div>;
};

export default Navbar;
