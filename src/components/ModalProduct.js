import React, {useContext, useRef} from 'react';
import {BASE_URL} from "../Utils/Constants";
import ProductContext from "../Context/Product_Context";
import Swal from 'sweetalert';

const ModalProduct = ({product, closeModal} ) => {

  const stt = useContext(ProductContext);

  const qtyEle = useRef(null);

  const addToCart = prod => {
    stt.addNew(prod,qtyEle.current.value);
    closeModal();
    Swal({icon: 'success', text: 'Producto agregado' ,type:'success', timer:2000});

  };

  return (
    <div className="container">
     <div className="row">
       <div className="col-md-3">
         <img className="img-responsive" src={BASE_URL + product.image} alt="a"/>
       </div>
       <div className="col-md-9">
         <h2>{product.name}</h2>
         <p>{product.description}</p>
         <div className="extrainput">
           <input type="number" name="quantity" ref={qtyEle} defaultValue="1" min="1" max="50"/>
         </div>
         <div className="cartBtn" style={{textAlign:'left'}}>
           <button type="button" onClick={() => addToCart(product)} className="btn btnTheme"> Agregar al pedido </button>
         </div>

       </div>
     </div>
    </div>
  )
};

export default ModalProduct;
