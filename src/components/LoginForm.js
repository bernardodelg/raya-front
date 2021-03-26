import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import {fetchPost} from "../Utils/Constants";
import Swal from 'sweetalert';
import { withRouter } from 'react-router-dom';

const LoginForm = (props) => {

  const { register, handleSubmit, errors } = useForm();
  const [fake, setFake] = useState('');
  const [favProducts, setFavProducts] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : []);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    fetchPost('login', formData)
      .then(response => {
        console.log('RESPONSE LOGIN', response);

        if(response.error)
          Swal({icon: 'error', text: response.message ,type:'error', timer:2000});
        else{
          props.onClose();
          setFake('true');
          Swal({icon: 'success',title:'Bienvenido' ,text: response.client.contact_name ,type:'success', timer:2000});
          localStorage.setItem('user', JSON.stringify(response.client));
          localStorage.removeItem('favorites');
          localStorage.setItem('favorites',JSON.stringify(response.client.favProducts));
          setTimeout(()=> {
            window.location.href = '/';
          },3000);

        }
      })
  };

  return (
    <>
      <h2 className="title"> Iniciar Sesión {fake}</h2>
      <div style={{textAlign:'center'}}><img src="/images/divider.png" alt=''/></div>
      <form className="form-horizontal form-fix-login" onSubmit={handleSubmit(onSubmit)}>
      {/* <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)} style={{paddingLeft:100,paddingRight:100, paddingTop:30, paddingBottom:50}}> */}
        <div className="form-group">
          <div className="col-md-12">
            <input type="text" name="email" ref={register({required:true})} className="form-control" placeholder="Correo electrónico"
              autoComplete="off"/>
            {errors.email && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <input type="password" name="password" ref={register({required:true})} className="form-control" placeholder="Password"
              autoComplete="off"/>
            {errors.password && <span style={{ color: 'red' }}>Este campo es requerido</span>}
          </div>
        </div>
        <div className="cartBtn">
          <button type="submit" className="btn btnTheme"> Ingresar </button>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <p style={{textAlign:'center'}}>¿No tienes cuenta? <span className="register" onClick={props.toggle}> Registrate </span></p>
          </div>
        </div>
      </form>
    </>
  )

};

export default withRouter(LoginForm);
