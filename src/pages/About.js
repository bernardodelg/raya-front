import React from 'react';

const About = () => {
  return (
    <section className="back bnosotrosbox" >
      <figure className="noso_desktop">
        <img src="/images/Nosotros-desktop.jpg" alt=""/>
      </figure>
      <figure className="noso_mobile">
        <img src="/images/Nosotros-mobile.jpg" alt=""/>
      </figure>
      <div className="norotusOuter">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12 col-md-6 noflotright">
              <div className="norotus">
                <h2 className="wow fadeInRight"> NOSOTROS <i><img src="/images/divider.png" alt=""/></i></h2>
                <p className="wow fadeInLeft">Somos la empresa número uno consolidada y reconocida por EL FOOD SERVICE,
                  en el occidente del país. Estamos respaldados por más de 25 años de experiencia, en los cuales nos
                  hemos distinguido de nuestra competencia por la calidad de nuestros productos, alianzas comerciales
                  con nuestros clientes, así como la calidad de nuestro servicio y los diferentes modelos de negocios.
                  Estos años de experiencia nos han permitido analizar a fondo las necesidades de nuestros clientes, por
                  lo que nos dimos a la tarea de ampliar nuestros servicios a otras esferas más allá de las frutas y
                  verduras. Por lo anterior es que ponemos a tu alcance el MERCADO DE ABASTOS. </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
};

export default About;
