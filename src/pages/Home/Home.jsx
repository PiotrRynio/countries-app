import React from 'react';
import { errorCodes, useCountriesNames } from '../../api/apiHooks';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

const Navbar = () => {
  const { isLoading, error, data } = useCountriesNames('united');

  if (isLoading) return <SectionTitle>'Loading...'</SectionTitle>;

  if (error) {
    if (error.message === errorCodes.NOT_FOUND)
      return <SectionTitle>'countries not found - modify the search field'</SectionTitle>;
    return <SectionTitle>'api server error'</SectionTitle>;
  }

  return (
    <div>
      <SectionTitle>Countries list:</SectionTitle>
      {data[0].name}
    </div>
  );
};

export default Navbar;
