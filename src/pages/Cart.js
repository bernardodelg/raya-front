import React, {useContext, useState, useRef, useEffect} from 'react';
import ProductContext from "../Context/Product_Context";
import {BASE_API, BASE_URL, fetchPost, SHIPPING_COST} from "../Utils/Constants";
import Swal from 'sweetalert';
import { withRouter } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./carrito.css";
import esES from "date-fns/locale/es";
import {BrowserView,MobileView,isBrowser,isMobile,isIOS} from "react-device-detect";

const Cart = () => {

  const { cart, cartCount, cartTotal } = useContext(ProductContext);
  const comments = useRef(null);
  const pickerRef = useRef(null);
  const [ clicking, setClicking ]= useState("block");
  const [ showp, SetShowp ]= useState("none");
  const dateNow = new Date().setDate(new Date().getDate() + 1);

  const [methodSelected,SetMethodSelected] = useState(11);
  const [startDate, setStartDate] = useState(null);

  const [commentSaved, setCommentSaved] = useState("");

  useEffect(() => {
    let commnets = localStorage.getItem("comments");
    if(commnets != null ){
      setCommentSaved(commnets);
    }else{
      setCommentSaved(null);
    }

    if (isMobile && pickerRef.current !== null) {
      pickerRef.current.input.readOnly = true;
    }

  },[isMobile, pickerRef]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  const validateOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    let isValid = true;
    if(user === null) {
      Swal({icon: 'warning',text: 'Debes de iniciar sesión para poder hacer el pedido' ,type:'warning', timer:2000});
      isValid = false;
    }
    else {
      if (startDate === '' || startDate === null || startDate === undefined) {
        Swal({icon: 'warning',text: 'Debes seleccionar la fecha del pedido' ,type:'warning', timer:2000});
        isValid = false;
      }

      /*if (cartTotal < 500) {
        Swal({icon: 'warning',text: 'El pedido debe ser mayor a $500.00 (sin contar el costo de envío)' ,type:'warning', timer:2000});
        isValid = false;
      }

      if (methodSelected === 11) {
        Swal({icon: 'warning',text: 'Debes seleccionar un método de pago.' ,type:'warning', timer:2000});
        isValid = false;
      }*/
    }
    return isValid;
  }

  const sendOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const order = {
      num_items:cartCount,
      subtotal: cartTotal,
      //shipping_cost:SHIPPING_COST,
      total:Number(cartTotal), //+ Number(SHIPPING_COST),
      status_payment:methodSelected,
    };

    const extraData = {
      comments: comments.current.value,
      delivery_data: startDate
    };

    const products = [...cart];
    const orderData = {
      order,
      products,
      extraData
    };

    const formData = new FormData();
    formData.append('order',JSON.stringify(orderData));

    SetShowp("block");
    setClicking("none");

    fetchPost('registerOrder',formData, user.token)
      .then(response => {
        if(response.error) {
          Swal({icon: 'error',text: response.message ,type:'error', timer:2000});
          SetShowp("none");
          setClicking("block");
        }else{
          Swal({icon: 'success',text: response.message ,type:'success', timer:1000});
          localStorage.removeItem('cart');
          localStorage.removeItem('count');
          localStorage.removeItem('total');
          localStorage.removeItem('comments');
          setTimeout(()=> {
            window.location.href = '/';
          },1000);

        }
      }).catch(error =>{
      SetShowp("none");
      setClicking("block");
    });
  }

  const submitOrder = () => {
    const flag = validateOrder();
    if (flag) sendOrder();
  };
  
  const BtnCart = () => {
    return (
      cartCount > 0 ? (
        <div className="cartBtn2">
          <div style={{display:clicking}}>
            <button type="button" className="btn btnTheme" onClick={() => submitOrder(cart, cartCount)}> Levantar pedido </button>
          </div>
          <div style={{display:showp}}>
            <p  >Procesando orden...</p>
          </div>
        </div>
      ) : '' )
  };

  const onMethodChanged = (e) => {
    SetMethodSelected(parseInt(e.currentTarget.value));
  };

  const isWeekday = date => {
    const day = new Date(date).getDay();
    return day !== 0;
  };  
  
  const addMonths = () => {
    var dt = new Date();
    return new Date(dt.setMonth(dt.getMonth() + 12));      
  };

  const commentsSave = (e) =>{
    localStorage.setItem("comments",e.currentTarget.value);
  }

  return (
    <section className="naturalInner" >
      <div className="container">
        <div className="row">
          <div className="headingOther">
            <h2>PRODUCTOS EN EL<span> CARRITO</span></h2>
          </div>
        </div>
        <div className="row">
          <div className={cartCount < 3 ? "cart-back table-responsive table-cart" : "cart-back table-responsive"}>
            <table className="table table-bordered table-cont2" id="table-carrito">
              <thead>
              <tr>
                <th className="th">Imagen</th>
                <th className="th">Producto</th>
                <th className="th">Cantidad</th>
                {/* <th className="th">Precio</th> */}
              </tr>
              </thead>
              <tbody>
              {
                cart.map((product,index) => {
                  return (
                    <tr key={index} style={{borderBottom:"1px gray !important"}}>
                      <td align="center"><img className="img-responsive" style={{height:40}} src={product.id > 9999 ? product.image :  BASE_URL + product.image} alt=""/></td>
                      <td align="center">{product.name}</td>
                      <td align="center">{product.count + ' ' + product.unit} </td>
                      {/* <td align="center">{formatter.format(product.productSelectedPrice)} </td> */}
                    </tr>
                  )
                })
              }

              {
                cartCount == 0 ? [{}].map((itemEx,index) => {
                  return (
                    <tr key={1000 + index} >
                      <td colSpan="3" align="center">No hay productos seleccionados</td>
                    </tr>
                  )
                })
                : <></>
              }

              {
                 !isBrowser ? <></> : [{},{}].map((itemEx,index) => {
                  return (
                    <tr key={99 + index} className="noBorder">
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  )
                })
              }
             
              </tbody>
            </table>
            <div className='row'>
              <form className='form-inline' id="form-checkout">
                <div className='col-md-4'>
                  <input type="text"
                         ref={comments} 
                         className="form-control" 
                         placeholder="Comentarios (máximo 150)" 
                         style={{ width: '100%' }} 
                         maxLength="150" 
                         onChange={commentsSave}
                         defaultValue={commentSaved}
                         />
                </div>
                {/* <div className='col-md-4'>
                  <select className="form-control" placeholder="Comentarios" style={{width:'100%'}} value={methodSelected} onChange={onMethodChanged}>
                    <option value={11} >Selecciona un método de pago</option>
                    <option value={1} >Tarjeta de débito/crédito</option>
                    <option value={0} > Efectivo</option>
                  </select>
                </div> */}
                <div className='col-md-4'>
                  {/* <div className="form-group"> */}
                  
                    <DatePicker
                      className="form-control datepicker-input"
                      selected={startDate}
                      onChange={date =>setStartDate(date)}
                      filterDate={isWeekday}
                      placeholderText="Fecha entrega"
                      minDate={dateNow}
                      maxDate={addMonths()}
                      locale={esES}
                      dateFormat="dd/MM/yyyy"
                      input={false}
                      style={{width:"100%"}}
                      popperPlacement="top-end"
                      popperClassName="custom-popper"
                      ref={pickerRef}
                    />
                    
                  {/* </div> */}
                </div>
                <div className='col-md-2'>
                  <BtnCart/>
                </div>
              </form>
            </div>
            <div className='row'>
              <p style={{float:'right', paddingTop:10, paddingRight:10}}>Nota: Por favor verifica que tu orden esté completa antes de "levantar pedido".</p>
            </div>
    
          </div>
        </div>
      </div>
    </section>
  )
};

export default withRouter(Cart);
