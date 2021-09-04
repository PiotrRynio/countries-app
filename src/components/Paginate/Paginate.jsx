import React from 'react';
import './Paginate.scss';
import ReactPaginate from 'react-paginate';

const Paginate = ({ pageCount = 1, forcePage = 1, onPageChange = (selected) => {} }) => {
  const onPageChangeHandle = ({ selected }) => {
    onPageChange(selected + 1);
  };
  return (
    <nav className="paginate">
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        onPageChange={onPageChangeHandle}
        containerClassName={'pagination'}
        forcePage={Number(forcePage - 1)}
        activeClassName={'active'}
      />
    </nav>
  );
};

export default Paginate;
