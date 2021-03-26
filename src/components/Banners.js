import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {BASE_URL} from "../Utils/Constants";

const Banners = ({banners}) => {

  const bannerLayout = banners.map(banner => {
    return (
      <div className="item" key={banner.id}>
        <div className="banner_text_outer force-height">
          <div className="content-img-slider">
            {/* <img style={{objectFit:'cover', height:500, width:'100%'}}  src={BASE_URL + banner.image} alt=""/> */}
            <img src={BASE_URL + banner.image} alt="" className="img-slider" />
            
            </div> 
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-md-12">
                <div className="banner_text">
                  <ul>
                   {/* <li className="banner3_text1 slide_common"><i className="fas fa-check"/> {banner.title}</li>
                    <li className="banner1_text2 slide_common"><i className="fas fa-check"/> {banner.description}</li>*/}
                   {/* <li className="banner2_text3 slide_common"><i className="fas fa-check"/> EFICIENCIA</li>*/}
                  </ul>
                 {/* <h3 className="banner1_img">
                    <small> Estamos para servirle siempre... </small>
                    ¡basta con una llamada!
                  </h3>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  });

  return (
    <section className="banner_box" >

      <div className="sliderOute">
        <OwlCarousel className="owl-theme" autoplay={false} loop margin={10} nav={false} items={1}>
          {bannerLayout}
        </OwlCarousel>
      </div>
    </section>
  )
};

export default Banners;
