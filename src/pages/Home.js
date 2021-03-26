import React, {useEffect, useState} from 'react';
import Banners from "../components/Banners";
import Outstanding from "../components/Outstanding";
import {fetchGet} from "../Utils/Constants";
import Loader from '../components/Loader';
import Modal from "react-responsive-modal";
import {BrowserView,MobileView,isBrowser,isMobile,isIOS} from "react-device-detect";

const Home = () => {

  const [banners, setBanners ] = useState([]);
  const [products, setProducts ] = useState([]);
  const [loading, setLoadind] = useState(false);
  const [open, setOpen] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(()=> {

    let popup = localStorage.getItem("popup-raya");
    if(popup != null){
      setIsOpenModal(true);
    }

    setLoadind(true);
    fetchGet('getHome')
      .then(response => {
        setBanners(response.banners);
        setProducts(response.products);
        setLoadind(false);

      }).catch(error => {
        console.log(error);
        setLoadind(false);
    });

  },[]);

  const onCloseModal = () => {
    setOpen(false);
    localStorage.setItem("popup-raya",true);
  };

  return (
    <>
      <Loader property={loading} />
      <Banners banners={banners} />
      <Outstanding products={products} />

      {
        isOpenModal ? <></> : 

        <MobileView>
          <Modal center open={open} onClose={() => onCloseModal()} classNames={{ modal: 'login-form' }} >
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <img className="img-responsive" src="/images/raya-logo.png" alt="a" />
                </div>
                <div className="col-md-9">
                  <br/>
                    {
                      isIOS ? 
                        <p>Agrega esta app a tu pantalla de inicio para tener fácil acceso a la misma y una mejor experiencia.<br />
                        <strong> Presiona <img src="/images/shareIos.png" style={{ width: 10 }} alt=""/> y luego «Añadir a pantalla de inicio»</strong>.</p> :
                      <p>
                          Agrega esta app a tu pantalla de inicio para tener fácil acceso a la misma y una mejor experiencia.<br /> 
                          <strong> Presiona <img src="/images/menu.png" style={{ width: 10 }} alt=""/> y luego «Añadir a pantalla de inicio»</strong>.
                      </p>
                    }
                </div>
              </div>
            </div>
          </Modal>
        </MobileView> 
      
      }
      
    </>
  )
};

export default Home;
