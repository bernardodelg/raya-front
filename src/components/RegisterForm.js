import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {fetchPost} from "../Utils/Constants";
import Swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

const RegisterForm = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const [clicking,setClicking] = useState("block");
  const [showp,setShowp] = useState("none");

  const onSubmit = data => {


    let seller_id = localStorage.getItem('usrI');
    const formData = new FormData();
    formData.append('commercial_name',data.commercial_name);
    formData.append('contact_name',data.contact_name);
    formData.append('rfc',data.rfc);
    formData.append('address',data.address);
    formData.append('phone',data.phone);
    formData.append('cellphone',data.cellphone);
    formData.append('password',data.password);
    formData.append('confirm_password', data.confirm_password);
    formData.append('email',data.email);
    formData.append('seller_id', seller_id == null ? '' : seller_id);

    setClicking("none");
    setShowp("block");

    fetchPost('registerUser', formData)
      .then(response => {
        //console.log('REGISTER RESPONSE', response);
        props.onClose();
        if(response.error){
          Swal({icon: 'error', text: response.message ,type:'error', timer:2000});
          setShowp("none");
          setClicking("block");
        }else{
          setShowp("none");
          setClicking("block");
          let seller_id = localStorage.getItem('usrI');
          if (seller_id != null) {
            localStorage.removeItem('usrI');
          }
          Swal({icon: 'success',title: 'Gracias por registrarte',text: 'El equipo de Raya se comunicará contigo cuando sea validada tu información' ,type:'success', timer:2000});
          setTimeout(() => {
            window.location.href = '/';
          }, 2000);

        }
      }).catch(error => {

          setShowp("none");
          setClicking("block");
         console.log(error)
      });
  };



  return (
    <>
      <h2 className="title"> Registro </h2>
      <div style={{textAlign:'center'}}><img src="/images/divider.png" alt=''/></div>
      <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} style={{paddingLeft:50,paddingRight:50, paddingTop:30, paddingBottom:50}}>
        <div className="form-group">
          <div className="col-md-6">
            <input type="text" name="commercial_name" ref={register({required:true})} className="form-control" placeholder="Nombre comercial"
              autoComplete="off" maxLength="150"/>
            {errors.commercial_name && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="text" name="contact_name" ref={register({required:true})} className="form-control" placeholder="Nombre del contacto"
              autoComplete="off" maxLength="150"/>
            {errors.contact_name && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
         
        </div>
        <div className="form-group">
          <div className="col-md-6">
            <input type="text" name="cellphone" ref={register({ required: true })} className="form-control" placeholder="Teléfono móvil" 
              autoComplete="off" maxLength="15"/>
            {errors.cellphone && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
          
          <div className="col-md-6">
            <input type="text" name="phone" ref={register({required:true})} className="form-control" placeholder="Teléfono fijo"
              autoComplete="off" maxLength="15"/>
            {errors.phone && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <input type="text" name="address" ref={register({required:true})} className="form-control" placeholder="Dirección de entrega"
              autoComplete="off" maxLength="244"/>
            {errors.address && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-6">
            <input type="text" name="rfc" ref={register({required:true})} className="form-control" placeholder="RFC"
              autoComplete="off" maxLength="13"/>
            {errors.rfc && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="text" name="email" ref={register({required:true})} className="form-control" placeholder="Correo electrónico (este será tu nombre de usuario)"
              autoComplete="off"/>
            {errors.email && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-6">
            <input type="password" name="password" ref={register({required:true})} className="form-control" placeholder="Contraseña"
              autoComplete="off"/>
            {errors.password && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
          <div className="col-md-6">
            <input type="password" name="confirm_password" ref={register({required:true})} className="form-control" placeholder="Confirmar contraseña"
              autoComplete="off"/>
            {errors.confirm_password && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <p style={{textAlign:'center'}}>Tu cuenta quedará activa una vez que el equipo de Raya la haya validado </p>
          </div>
        </div>
        <div className="cartBtn">
          <button type="submit" className="btn btnTheme" style={{display:clicking}}> Registrarme </button>
          <p  style={{display:showp}}>Procesando registro...</p>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <p style={{textAlign:'center'}}>¿Ya tienes cuenta? <span className="register" onClick={props.toggle}> Iniciar sesión </span></p>
          </div>
        </div>
      </form>
    </>
  )
};

export default withRouter(RegisterForm);
