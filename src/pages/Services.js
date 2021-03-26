// import React from 'react';
import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

class Services extends Component {

  state = {
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  }
  render(){
    return (
    <section className="testimonialsMain">
      <div className="container">
        <div className="testimonialsInner">
          <div className="row">
            <div className="col-md-12">
              <div className="servboxtittle">
                <h2 className="wow fadeInRight">
                  <figure className="slogo">
                    <img src="/images/ribbon.png" alt="logo"/>
                  </figure>
                  SERVICIOS <i className="dividerlint"><img src="/images/divider.png" alt=""/></i>
                </h2>
                <p className="wow fadeInLeft"> Venta y distribución de: </p>
              </div>
              <div className="sliderouterr">
                <OwlCarousel className="owl-theme" loop margin={10} nav={false} responsiveClass={true} items={5} responsive={this.state.responsive}>
                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/services4.jpg" alt=""/>
                      <h4>Frutas</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/services6.jpg" alt=""/>
                      <h4>Verduras</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/abarrotes.png" alt=""/>
                      <h4>Abarrotes</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/services5.jpg" alt=""/>
                      <h4>Pollo</h4>
                    </div>
                  </div>
                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/services2.jpg" alt=""/>
                      <h4>Carne</h4>
                    </div>
                  </div>

                  <div className="item">
                    <div className="testimonialsDetail">
                      <img className="img-responsive" src="/images/services3.jpg" alt=""/>
                      <h4>Cremería</h4>
                    </div>
                  </div>

                    <div className="item">
                      <div className="testimonialsDetail">
                        <img className="img-responsive" src="/images/service7.png" alt="" />
                        <h4>Pescado</h4>
                      </div>
                    </div>

                </OwlCarousel>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  )
  }
};

export default Services;
