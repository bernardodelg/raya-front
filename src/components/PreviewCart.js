import React, {useContext} from 'react';
import ProductContext from "../Context/Product_Context";
import {BASE_URL, SHIPPING_COST} from "../Utils/Constants";
import Swal from "sweetalert";

const PreviewCart = ({prev, onMouseLeave}) => {

  const { cart } = useContext(ProductContext);
  const { cartTotal } = useContext(ProductContext);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const previewCart = cart.map((product,index) => {

    return (
      <div key={index} className="cartDeatilInner">
        <figure>
          <img className="img-responsive" src={ product.id > 9999 ? product.image :  BASE_URL + product.image} alt="fruit"/>
        </figure>
        <article>
            <div>
                <h2 style={{fontSize:"20px",fontWeight:"800"}}>Cantidad: <span style={{color:'#ff6600'}}>{product.count} {product.unit} </span></h2>
            </div>
          {/* <h2> 
            
            {`${product.name} (${formatter.format(product.productSelectedPrice)})`}
           </h2> */}
          <AddQtyProduct product={product}/>
          <RemoveProduct product={product}/>
        </article>
      </div>
    )
  });

  return (
    <>
    <div id="divMsg" style={{display:prev}}>
    {/* <div id="divMsg" style={{display:prev}} onMouseLeave={onMouseLeave}> */}
      <div className="catDetail">
        <h3> MI <strong> PEDIDO </strong></h3>
        {previewCart}
        {/* <hr />
          <div style={{textAlign:"right"}}>
            <p>SubTotal: {formatter.format(cartTotal)}</p>
            <p>Costo de envío: {formatter.format(SHIPPING_COST)}</p>
            <p>Total: {formatter.format(Number(cartTotal) + Number(SHIPPING_COST))}</p>
          </div> */}
        <div className="cartBtn">
          <a href="/carrito" className="btn btnTheme"> Ver carrito </a>
          <RemoveOrder/>

        </div>

      </div>
    </div>
    </>
  )
};

const AddQtyProduct = ({product}) => {
  const state = useContext(ProductContext);
  let qty = 0;
  const onChangeQty = (e) => {
    if (e.target.value === ''){
      qty = 0;
    }else{
      qty = parseFloat(e.target.value);
    }
  };

  return (
    <>
      <div className="extrainput">
        <input type="number" name="quantity" min="1" max="50" onChange={onChangeQty} defaultValue=""/>
      </div>

      <button type='button' className='btn addBtn' onClick={() => {
        if (qty === 0){
          Swal({icon: 'warning', text: 'Es necesario agregar una cantidad al producto ' + product.name ,type:'warning', timer:2000});
        }else{
          state.addNew(product,qty);
          Swal({icon: 'success',text: 'Producto agregado al carrito',showConfirmButton: false,timer: 1300});
        }

      }}>
        Agregar
      </button>
    </>
  )
};

const RemoveOrder = () => {
  const state = useContext(ProductContext);
  return (
    <button type="button" className="btn btnTheme1" style={{marginLeft:10}} onClick={() => state.removeAllItems()}> borrar pedido </button>
  )
};

const RemoveProduct = ({product}) => {
  const state = useContext(ProductContext);
  return (
    <i className="fas fa-trash-alt" style={{cursor:'pointer',fontSize:"20px"}} onClick={()=> state.removePd(state.cart.indexOf(product))}/>
  )
};

export default PreviewCart;
