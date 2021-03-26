import React from 'react';

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Seller from './pages/Seller';


function App() {
  return (
    <React.Fragment>
      <Header/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/nosotros" component={About}/>
        <Route path="/servicios" component={Services}/>
        <Route path="/pedidos/:category_id?/:keyword?" component={Products}/>
        <Route path="/contacto" component={Contact}/>
        <Route path="/perfil" component={Profile}/>
        <Route path="/carrito" component={Cart}/>
        <Route path="/terminos" component={Terms}/>
        <Route path="/privacidad" component={Privacy}/>
        <Route path="/vendedor/:seller_id?" component={Seller} />
      </Switch>
      <Footer/>
      
    </React.Fragment>
  );
}

export default App;
