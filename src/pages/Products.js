import React, {useContext, useEffect, useState} from 'react';
import Categories from "../components/Categories";
import GridProducts from "../components/GridProducts";
import {fetchGet} from "../Utils/Constants";
import { withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert';
import ProductContext from "../Context/Product_Context";
import Loader from '../components/Loader';

//const state = useContext()

const Products = (props) => {

  const state = useContext(ProductContext);

  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const [loading, setLoadind] = useState(false);
  const [categorieSelected, setCategorieSelected] = useState(0);

  const [totalProducts, setTotalProducts] = useState(0);
  const [ProductsPerPage, setProductsPerPage] = useState(0);
  const [activePage, SetActivePage] = useState(1);


  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {

    setLoadind(true);

    let seller_id = localStorage.getItem('usrI');
    if (seller_id != null){
      localStorage.removeItem('usrI');
    }

    let path = ''
    if (props.match.params.category_id !== undefined) {
      path += '/' + props.match.params.category_id;
    }

    if (props.match.params.keyword !== undefined) {
      path += '/' + props.match.params.keyword;
      setCategorieSelected(0);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let token = '';
    if (user !== null) {
      token = user.token;
    }

    fetchGet('getProducts' + path, token)
      .then(data => {
        setProducts(data.products.data);
        setCategories(data.categories);
        setFilterProducts(data.products.data);
        setCategorieSelected(parseInt(props.match.params.category_id));
        setTotalProducts(data.products.total);
        setProductsPerPage(data.products.per_page);
        window.scrollTo(0, 500);

        // if(props.location.state.search !== ''){
        //   filterData(data.products, props.location.state.search)
        // }
        setLoadind(false);
      }).catch(error => {
        setLoadind(false);
        console.log("ERROR PRODUCTS", error);
    })
  },[]);

  const filterData = (prod, srch) => {

    const fil = prod.filter(product => {
      return (product.name.toLocaleLowerCase().indexOf(srch.toLocaleLowerCase()) !== -1)
    });
    setFilterProducts(fil);
  };

  const filterCategory = id => {

    if (id === 0)
      window.location.href = "/pedidos/" + id;
    // setFilterProducts(products);
    else if (id === 10) {
      window.location.href = "/pedidos/" + id;
      // const fav = localStorage.getItem('favorites');
      // if(fav === null){
      //   setFilterProducts([]);
      // }else{
      //   setFilterProducts(JSON.parse(fav));
      // }

    }else if(id === 8){
      openModal();
    } else{
      // const filter = products.filter(product => {
      //   return parseInt(product.category_id) === parseInt(id);
      // });
      // setFilterProducts(filter);
      window.location.href = "/pedidos/" + id;
    }
  };

  const onSubmit = data => {

    const product = {
      name: data.name,
      id:Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 9)),
      count: parseInt(data.qty),
      image:'/images/logo-raya.png',
      key:'varios',
      unit:data.unit,
      unit_price: 0,
      productSelectedPrice:0
    };

    state.addNew(product,data.qty);

    closeModal();
    Swal({icon: 'success',text: 'Producto agregado a carrito', type:'success', timer:2000});
    
  };

  const handlePageChange = (pageNumber) => {
    window.scrollTo(0, 500);

    SetActivePage(pageNumber);
    let path = ''

    if (props.match.params.category_id !== undefined) {
      path += '/' + props.match.params.category_id;
    }

    if (props.match.params.keyword !== undefined) {
      path += '/' + props.match.params.keyword;
    }

    const user = JSON.parse(localStorage.getItem('user'));
    let token = '';
    if (user !== null) {
      token = user.token;
    }

    fetchGet('getProducts' + path + "?page=" + pageNumber, token)
      .then(data => {
        console.log(data);
        setProducts(data.products.data);
        setCategories(data.categories);
        // setLogos(data.logos);
        setFilterProducts(data.products.data);
        setCategorieSelected(parseInt(props.match.params.category_id));


        setLoadind(false);
      }).catch(error => {
        setLoadind(false);
        console.log("ERROR PRODUCTS", error);
      })
  }

  return (
   <>
      <Categories filterCategory={filterCategory} categorieSelected={categorieSelected} categories={categories}/>
    <Loader property={loading}/>
      <GridProducts products={filterProducts} handlePageChange={handlePageChange}
        totalProducts={totalProducts} ProductsPerPage={ProductsPerPage} activePage={activePage}/>
        <section className="produtcCheck">
          <div className="norotusOuterCart">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-md-6">
                  <div className="proChe wow  bounceOutDown">
                    <img src="/images/ribbon.png" className="img-responsive" alt=""/>
                    <p>Somos la empresa número uno consolidada y reconocida por el Food Service en el occidente del país. </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
     <Modal center open={isOpen} onClose={closeModal}>
       <div style={{padding:20}}>
         <h2 className="wow fadeInRight title" style={{color:'#ff6600'}}>
           Agregar producto varios <i className="dividerlint"><img src="/images/divider.png" alt=""/></i>
         </h2>
         <form onSubmit={handleSubmit(onSubmit)}>
           <div className="form-group">
             <label>Nombre<span style={{color:'red'}}>*</span></label>
             <input type="text" className="form-control" name="name" ref={register({required:true})} placeholder="Nombre" />
             {errors.name && <span style={{ color:'red'}}>Campo requerido</span>}
           </div>

           <div className="form-group">
             <label>Cantidad<span style={{color:'red'}}>*</span></label>
              <input type="text" className="form-control" name="qty" ref={register({ required: true })} placeholder="Cantidad (solo numeros)" type="number" step=".01"/>
             {errors.qty && <span style={{ color:'red'}}>Campo requerido</span>}
           </div>
           <div className="form-group">
             <label>Unidad<span style={{color:'red'}}>*</span></label>
             <select className="form-control" name="unit" ref={register({required:true})}>
               <option value="Pz">Pz</option>
               <option value="Kg">Kg</option>
               <option value="Lts">Lts</option>
               <option value="Cj">Cj</option>
               <option value="Lata">Lata</option>
               <option value="Manojo">Manojo</option>
               <option value="Paquete">Paquete</option>
               <option value="Grs">Grs</option>
             </select>
             {errors.unit && <span style={{ color:'red'}}>Campo requerido</span>}
           </div>
           <div className="cartBtn">
            <button type="submit" className="btn btnTheme">Agregar</button>
           </div>
         </form>
       </div>
     </Modal>
   </>
)
};

export default withRouter(Products);
