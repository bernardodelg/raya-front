import React, {useState} from 'react';
import ListProducts from "./ListProducts";
import Modal from "react-responsive-modal";
import ModalProduct from "./ModalProduct";

const Outstanding  = ({products}) => {

  const [isOpen, setOpen] = useState(false);
  const [prod, setProd] = useState({});

  const openModal = product => {
   // console.log(product);
    setProd(product);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <section className="main-products" >
      <div className="container">
        <div className="row">
          <div className="headingOther  outstandingProducts">
            <h2>PRODUCTOS <span>DESTACADOS</span></h2>
          </div>
          <ListProducts pagination={false} openModal={openModal} products={products} stl="col-lg-5ths col-sm-4 col-md-5ths col-xs-6"
            categorieSelected={0}/>
          <Modal center open={isOpen} onClose={closeModal}>
            <ModalProduct product={prod} closeModal={closeModal}/>
          </Modal>
        </div>
      </div>
    </section>
  )
};

export default Outstanding;
