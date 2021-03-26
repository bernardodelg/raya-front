import React, {useContext, useEffect, useState} from 'react';
import {fetchGet, fetchPost} from "../Utils/Constants";
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert';
import ProductContext from "../Context/Product_Context";
import { useForm } from "react-hook-form";

const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const [userInfo, setUser ] = useState({});
  const [ orders, setOrders ] = useState([]);
  const stt = useContext(ProductContext);

  const { register, handleSubmit, errors } = useForm();
  const [clicking, setClicking] = useState("block");
  const [showp, setShowp] = useState("none");

  const onSubmit = data => {

    const formData = new FormData();
    formData.append('commercial_name',data.commercial_name);
    formData.append('contact_name', data.contact_name);
    formData.append('rfc',data.rfc);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    formData.append('cellphone', data.cellphone);
    formData.append('password', data.password);
    formData.append('email', data.email);

    setClicking("none");
    setShowp("block");

    fetchPost('updateProfile', formData, user.token)
      .then(response => {

        if (response.error) {
          Swal({icon: 'error',text: response.message, type:'error', timer:2000});
          setShowp("none");
          setClicking("block");
        } else {
          setShowp("none");
          setClicking("block");

          Swal({icon: 'success',text: response.message, type:'success', timer:2000});

          setTimeout(() => {
            window.location.href = '/perfil';
          }, 2000);

        }
      }).catch(error => {

        setShowp("none");
        setClicking("block");
        console.log(error)
      });
  };

  useEffect(() => {
    
    fetchGet('profile/'+user.id,user.token)
      .then(response => {
        if(response.error)
          Swal({icon: 'error',text: 'Ocurrió un error', type:'error', timer:2000});
        else{
          setUser(response.user);
          setOrders(response.orders);
        }
      }).catch(error => {
        console.log(error);
    })
  },[user.id,user.token]);

  const copyOrder = order => {
    const details = order.details;
    details.forEach(detail => {
      stt.addNew(detail.product,detail.qty);
    });

    Swal({icon: 'success',text: 'Productos agregados al carrito', type:'success', timer:2000});
  };

  const logout = () => {
    fetchPost('logout','',)
      .then(response => {
        localStorage.clear();
        setTimeout(()=> {
          window.location.href = '/';
        },100);
       // props.history.push('/');
      }).catch(error => console.log(error));
  };

  return (
    <section className="naturalInner">
      <div className="container">
        <div className="row">
          <div className="headingOther">

            <div className="cartBtn2">
              <button type="button" className="btn btnTheme" onClick={logout}>Cerrar sesión</button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="cart-back">
            <ul className="nav nav-tabs">
              <li role="presentation" className="active"><a data-toggle="tab" href="#profile">Perfil</a></li>
              <li role="presentation"><a data-toggle="tab" href="#orders">Órdenes</a></li>
            </ul>

            <div className="tab-content">
              <div id="profile" className="tab-pane fade in active table-cont2">
                <h3>Información del usuario</h3>
                <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 30, paddingBottom: 50 }}>
                  <div className="form-group">
                    <div className="col-md-6">
                      <input type="text" name="commercial_name" ref={register({ required: true })} className="form-control" placeholder="Nombre comercial"
                        autoComplete="off" maxLength="150" defaultValue={userInfo.commercial_name}/>
                      {errors.commercial_name && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                    <div className="col-md-6">
                      <input type="text" name="contact_name" ref={register({ required: true })} className="form-control" placeholder="Nombre del contacto"
                        autoComplete="off" maxLength="150" defaultValue={userInfo.contact_name}/>
                      {errors.contact_name && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>

                  </div>
                  <div className="form-group">
                    <div className="col-md-6">
                      <input type="text" name="cellphone" ref={register({ required: true })} className="form-control" placeholder="Teléfono móvil"
                        autoComplete="off" maxLength="15" defaultValue={userInfo.cellphone}/>
                      {errors.cellphone && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>

                    <div className="col-md-6">
                      <input type="text" name="phone" ref={register({ required: true })} className="form-control" placeholder="Teléfono fijo"
                        autoComplete="off" maxLength="15" defaultValue={userInfo.phone}/>
                      {errors.phone && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-12">
                      <input type="text" name="address" ref={register({ required: true })} className="form-control" placeholder="Dirección de entrega"
                        autoComplete="off" maxLength="244" defaultValue={userInfo.address}/>
                      {errors.address && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6">
                      <input type="text" name="rfc" ref={register({ required: true })} className="form-control" placeholder="RFC"
                        autoComplete="off" maxLength="13" defaultValue={userInfo.rfc}/>
                      {errors.rfc && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                    <div className="col-md-6">
                      <input type="text" name="email" ref={register({ required: true })} className="form-control" placeholder="Correo electrónico (este será tu nombre de usuario)"
                        autoComplete="off" defaultValue={userInfo.email}/>
                      {errors.email && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-md-6">
                      <input type="password" name="password" ref={register({ required: false })} className="form-control" placeholder="Contraseña"
                        autoComplete="off" />
                      {errors.password && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                    <div className="col-md-6">
                      <input type="password" name="confirm_password" ref={register({ required: false })} className="form-control" placeholder="Confirmar contraseña"
                        autoComplete="off" />
                      {errors.confirm_password && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    </div>
                  </div>
                  <div className="cartBtn">
                    <button type="submit" className="btn btnTheme" style={{ display: clicking }}> Actualizar </button>
                    <p style={{ display: showp }}>Procesando registro...</p>
                  </div>
                </form>
              </div>
              <div id="orders" className="tab-pane fade">
                <h3>Órdenes</h3>
                <h4>Nota: Al dar click en ‘Duplicar pedido’ se agregarán al carrito los productos solicitados con anterioridad en esa orden.</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="th">Número de orden</th>
                      <th className="th">Número de productos</th>
                      {/* <th className="th">Estatus de la orden</th> */}
                      <th className="th">Fecha entrega</th>
                      <th className="th">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    orders.map(order => {
                      return (
                        <tr key={order.id}>
                          <td align="center">{order.id}</td>
                          <td align="center">{order.num_items}</td>
                          {/* <td align="center">{order.order_status}</td> */}
                          <td align="center">{order.delivery_date}</td>
                          <td align="center">
                           {/* <button className="btn btn-primary" type="button" style={{marginRight:15}}>Ver detalle</button>*/}
                            <button className="btn btn-danger" onClick={()=>copyOrder(order)} type="button">Duplicar pedido</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};


export default withRouter(Profile);
