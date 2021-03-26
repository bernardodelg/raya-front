import React from 'react';

const Footer = () => {

  return (
    <section className="footerOuter">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="footerLeft">
              <h2>ACÉRCATE</h2>
              <p>Sé parte de los clientes exclusivos, envía tu petición de alta a: </p>
              <p className="email-footer"><b>administrador@rayafrutasyverduras.com.mx</b></p>
              <p>Piña 1724, local 12-C, Mercado de <br/> Abastos, Guadalajara. <br/>CP: 44530 </p>
              
              <br />
              <p><img src={"/images/whatsappicon.png"} style={{width:30,height:30}} alt="" /> 38493439 </p>
              <p>Teléfono: 36710942  ó 36713754</p>
              <p className="email-footer"><b>contacto@rayafrutasyverduras.com.mx</b></p>

              <p>www.rayafrutasyverduras.com.mx</p>
            </div>
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12">
            <div className="footerRight">
              <ul>
                {/* <li><a href="#">Legal</a></li> */}
                <li><a href="/privacidad">Aviso de privacidad</a></li>
                <li><a href="/terminos">Términos y condiciones</a></li>
              </ul>
              <div className="social">
                <ul>
                  <li><a href="https://www.facebook.com/hechoslaraya/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a></li>
                  <li><a href="https://instagram.com/hechoslaraya?igshid=dykvv6n7fji2" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                  {/* <li><a href="#"><i className="fab fa-twitter"></i></a></li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Footer;
