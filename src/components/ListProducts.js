import React, {useContext, useState} from 'react';
import ProductContext from "../Context/Product_Context";
import {BASE_URL} from "../Utils/Constants";
import Swal from 'sweetalert';
import Pagination from "./Pagination";
import PaginationReact from "./PaginationReact";
import {fetchPost} from "../Utils/Constants";
import ModalUnits from "./ModalUnits";


const ListProducts = ({ products, stl, openModal, pagination, categorieSelected, handlePageChange, totalProducts, ProductsPerPage, activePage}) => {

  const [favProducts] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);
  const [currentPage] = useState(1);
  const [productsPerPage] = useState(15);
  // const [category, SetCategory] = useState(0);


  // const paginate = pageNumber =>  setCurrentPage(pageNumber);

  // if (parseInt(categorieSelected) !== parseInt(category)) {
  //   SetCategory(parseInt(categorieSelected));
  //   setCurrentPage(1);
  // }


  /*const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });*/

  const saveFavProduct = prod => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){

      const formData = new FormData();
      formData.append('product_id',prod.id);

      fetchPost('saveFavoriteProducts',formData,user.token)
          .then(response => {
              if(response.error)
                Swal({icon: 'error', text: response.message ,type:'error', timer:2000});
              else{
                localStorage.removeItem('favorites');
                localStorage.setItem('favorites',JSON.stringify(response.favProduct));
                Swal({icon: 'success', text: response.message ,type:'success', timer:2000});

                setTimeout(()=> window.location.reload(),1000);
              }
          }).catch(error => {
              Swal({icon: 'error', text: error.message ,type:'error', timer:2000});
      })
    }else{
      Swal({icon: 'error', text: 'Debes de iniciar sesión para agregar este producto a tus favoritos.' ,type:'error', timer:2000});
    }
  };

 /* const AddToCart = ({product}) => {
    const stt = useContext(ProductContext);
    let value = 1;

    const inputChange = (event) => {
      console.log(event.target.value);
      value = parseFloat(event.target.value);
    };

    return (
      <>
        <div className="extrainput">
          <input type="number" name="quantity" onChange={inputChange} defaultValue="1" min="1" max="50"/>
        </div>
        <button type="button" className="add-cart" onClick={() => {
          stt.addNew(product, value);
           Swal({icon: 'success', text: 'Producto agregado al carrito' ,type:'success', timer:2000});
          
        }}>
          <i className="fas fa-shopping-cart"/>
        </button>
      </>
    );
  };*/

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const list = currentProduct.length === 0 ? 'Resultados no encontrados...' :  currentProduct.map(product => {
    return (
      <div key={product.id} className={stl}>
        <div className="productss">
          <div className="prodoctTop">
            <figure><img className="img-responsive img-special" src={BASE_URL + product.image} alt="" /></figure>
            <div className="pro-position">
              <div className="heart" onClick={()=> saveFavProduct(product)}>
                <i className={ favProducts.map(fav => { return fav.id } ).indexOf(product.id) !== -1 ? 'fas fa-heart' : 'far fa-heart'}/>
              </div>
              <div className="infoo" >
                <ModalUnits product={product} type={0} />
              </div>
            </div>
          </div>
          <div className="productBottom">
            <h2>{`${product.name}`}</h2>
            <div className="bottomIcon">
                <ModalUnits product={product} type={1} />
            </div>
          </div>
        </div>
      </div>
    )
  });

  return (
    <div className="container">
      <div className="row" style={{textAlign:"center"}}>
        {list}
      </div>
      {
        pagination && <div className="row center-pagination">
          <PaginationReact handlePageChange={handlePageChange} totalProducts={totalProducts} ProductsPerPage={ProductsPerPage} activePage={activePage} />
          {/* <Pagination productsPerPage={productsPerPage} totalProducts={products.length} paginate={paginate} currentPage={currentPage}/> */}
        </div>
      }
    </div>
    );
};

export default ListProducts;
