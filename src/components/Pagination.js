import React from 'react';
import {Link} from "react-router-dom";

const Pagination = ({productsPerPage, totalProducts, paginate, currentPage}) => {

    const pageNumber = [];

    for(let i=1; i <= Math.ceil(totalProducts / productsPerPage); i++){
        pageNumber.push(i);
    }

    return (

        
        <div className="pagination">

            <ul>
                <li style={{marginRight:30}} onClick={() => {if(currentPage>1) paginate(currentPage - 1)}}>
                    <Link to="#"><span className="icon left"/></Link>
                </li>
                {
                    
                    pageNumber.map(number => (
                        <li className={ currentPage === number ? 'active': '' } onClick={() => paginate(number)} key={number}>
                            <Link to="#"><span>{number}</span></Link>
                        </li>
                    ))
                }
                <li onClick={() => {if(currentPage< Math.ceil(totalProducts / productsPerPage)) paginate(currentPage + 1)}}>
                    <Link to="#"><span className="icon right"/></Link>
                </li>
            </ul>
        </div>
    )
};

export default Pagination;