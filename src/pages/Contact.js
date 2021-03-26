import React from 'react';
import { GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import { useForm } from "react-hook-form";
import {fetchPost} from "../Utils/Constants";
import Swal from 'sweetalert';

const Contact = () => {

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
  
      const formData = new FormData();
      formData.append('name',data.name);
      formData.append('phone',data.phone);
      formData.append('subject',data.subject);
      formData.append('comments',data.comments);

      fetchPost('sendContact',formData)
        .then(response=> {
          if(response.error)
            Swal({icon: 'error',text: response.message, type:'error', timer:2000});
          else{
            Swal({icon: 'success',text: response.message, type:'success', timer:2000});
            setTimeout(() => {
              window.location.href = '/contacto';
            }, 2500);
          }

        }).catch(error=>console.log(error));
  };

  const center = {
    lat: 20.653119,
    lng: -103.380364,
  };

  return (
    <section className="back bnosotrosbox">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12 ">
            <div className="contacto" style={{marginTop:150}}>
              <h2 className="wow fadeInRight"> CONTÁCTANOS </h2>
              <img src="/images/divider.png" alt="" style={{marginBottom:20}}/>
              <p className="wow fadeInLeft">Somos la empresa número uno consolidada y reconocida por EL FOOD SERVICE,
                en el occidente del país. </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-2 col-md-12 ">
            <div className="form-contact back2">
              <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Nombre</label>
                  <div className="col-sm-5">
                    <input type="text" className="form-control" name="name" ref={register} placeholder="Nombre"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1" className="col-sm-4 control-label">Teléfono</label>
                  <div className="col-sm-5">
                    <input type="text" className="form-control" name="phone" ref={register} placeholder="Teléfono"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Asunto</label>
                  <div className="col-sm-5">
                    <input type="text" className="form-control" name="subject" ref={register} placeholder="Asunto"/>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label">Comentarios</label>
                  <div className="col-sm-5">
                    <textarea className="form-control" name="comments" ref={register} placeholder="Comentario" cols="3" rows="3"/>
                  </div>
                </div>
                <button type="submit" className="btn btn-default">Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-sm-12 col-md-12 ">
            <LoadScript id="script-loader" googleMapsApiKey="AIzaSyDpfL6G4DCXjdEf3zkO1arJeZfqx-_ljrI">
              <GoogleMap zoom={19} center={center} mapContainerStyle={{height: '600px', width: '100%'}}>
                <Marker onLoad={marker => {console.log('marker: ', marker)}}
                  position={{ lat: center.lat, lng: center.lng}}
                />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Contact;
