import React from 'react';
import Pagination from "react-js-pagination";

const PaginationReact = (props) => {

    return (
      <Pagination
          activePage={props.activePage}
          itemsCountPerPage={props.ProductsPerPage}
          totalItemsCount={props.totalProducts}
          pageRangeDisplayed={5}
          onChange={props.handlePageChange.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
      />
    );
};

export default PaginationReact;
