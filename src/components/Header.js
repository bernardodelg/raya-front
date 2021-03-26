import React, {useState, useContext, useRef, useEffect} from 'react';
import { Link, withRouter } from "react-router-dom";
import PreviewCart from "./PreviewCart";
import Modal from 'react-responsive-modal';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Animated} from "react-animated-css";
import ProductContext from "../Context/Product_Context";

const Header = (props) => {

  const [ showPrev, setShowPrev] = useState('none');
  const [ open, setOpen ] = useState(false);
  const [ show, setShow ] = useState(true);
  const [activeRoute, setActiveRoute] = useState("");
  const refSearch = useRef(null);
  

  const { cartCount } = useContext(ProductContext);

  const isLogged = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      return (
        <Link to="/perfil"> <i className="fa fa-user" style={{fontSize:24}}/></Link>
      )
    }else{
      return (
        <Link to="#" onClick={onOpenModal}>Ingresar</Link>
      )
    }
  };

  let locationVar = window.location.pathname;
  useEffect(() => {
    setActiveRoute(locationVar);
  }, [locationVar]);

  const togglePreviewCart = () => {
    setShowPrev( showPrev === 'none' ? 'block' : 'none');
  };

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const toggleView = () => {
    setShow(!show);
  };

  const searchProductEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // props.history.push('/pedidos',{search: e.target.value});
      window.location.href = "/pedidos/0/" + e.target.value;
    }
  };

  const searchProduct = () => {
    // props.history.push('/pedidos',{search: refSearch.current.value});
    window.location.href = "/pedidos/0/" + refSearch.current.value;

  };

  return (
    <header className="headermain">
        <nav className="navbar">
          <div className="container-fluid">
            
            <div className="navbar-header">

				<button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1" aria-expanded="false" id="buttonMenu">
						<i className="menu-sand fas fa-align-justify"/>
				</button>
			
				<button type="button" className="navbar-toggle collapsed search-container button-mobile-search" 
					data-toggle="collapse" data-target="#search_mobile" aria-expanded="false">
					<i className="fa fa-search"/>
				</button>
              
				<button type="button" className="navbar-toggle collapsed"
						aria-expanded="false">
					<div className="shop-cart" onClick={togglePreviewCart}>
					<i className="fa fa-shopping-cart" style={{fontSize:24}}/>
					<cite className="numberbox">{cartCount}</cite>
					</div>
				</button>

				<div className="logo">
					{/* <Link to="/"><img src="/images/logo.png" className="img-responsive" alt="Logo"/></Link> */}
              <Link to="/"><img src="/images/logo.png" className="img-responsive" alt="Logo" style={{height:70,objectFit:"contain"}}  /></Link>
				</div>
            </div>

          	<div className="uk-dropdown uk-dropdown-navbar uk-dropdown-bottom collapse menu-header" id="search_mobile">
              <form className="uk-form">
                <div className="uk-form-icon uk-form-icon-flip">
                  <i className="uk-icon-search"></i>
                  <input type="text" className="uk-form-large uk-width-1-1" ref={refSearch} placeholder="Buscar..." onKeyPress={searchProductEnter} />
                </div>
              </form>
            </div>

        
          	<div className="collapse navbar-collapse menu-header" id="bs-example-navbar-collapse-1" >
				<ul className="nav navbar-nav navbar-right" style={{marginTop:9}}>
              <li><Link to="/nosotros" className={activeRoute === "/nosotros" ? "link-active" : "link-no-active"}>Nosotros </Link></li>
              <li><Link to="/servicios" className={activeRoute === "/servicios" ? "link-active" : "link-no-active"}>Servicios </Link></li>
              <li><a href='/pedidos/0' className={activeRoute === "/pedidos" ? "link-active" : "link-no-active"} >Pedidos </a></li>
          <li><Link to="/contacto" className={activeRoute === "/contacto" ? "link-active" : "link-no-active"}>Contacto </Link></li>
					<li>
						<form className="navbar-form toggle" style={{ marginTop: 0 }} >
							<div className="form-group ">
							<input type="text" className="form-control" ref={refSearch}  placeholder="Buscar..." onKeyPress={searchProductEnter}/>
							</div>
							<button type="button" className="search-container" onClick={searchProduct}>
							<i className="fa fa-search"/>
							</button>
						</form>
					</li>
					<li>{isLogged()}</li>
					<li>
					<div className="shop-cart toggle" onClick={togglePreviewCart}>
						<i className="fa fa-shopping-cart" style={{fontSize:24}}/>
						<cite className="numberbox">{cartCount}</cite>
					</div>
					</li>
				</ul>
            </div>
          </div>
        </nav>

      	<PreviewCart prev={showPrev} onMouseLeave={togglePreviewCart}/>

		<Modal center open={open} onClose={onCloseModal} classNames={{modal:'login-form'}}>
			<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={show} style={{display: show ? 'block' : 'none'}}>
				<LoginForm toggle={toggleView} onClose={onCloseModal} />
			</Animated>
			<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={!show} style={{display: show ? 'none' : 'block'}}>
				<RegisterForm toggle={toggleView} onClose={onCloseModal}/>
			</Animated>
		</Modal>
    </header>
  )
};

export default withRouter(Header);
